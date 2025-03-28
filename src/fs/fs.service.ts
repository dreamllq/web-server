import { Injectable } from '@nestjs/common';
import { CreateFDto } from './dto/create-f.dto';
import { UpdateFDto } from './dto/update-f.dto';
import { F } from './entities/f.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository, TreeRepository } from 'typeorm';
import { PathType } from './constants/path-type';
import { IPaginationOptions } from 'src/types';
import { FileDetail } from './entities/file-detail.entity';
import { cloneDeep, isBoolean, max } from 'lodash';
import { GetAllFDto } from './dto/get-all-f.dto';
const yauzl = require('yauzl');
import { FileService } from 'src/file/file.service';

@Injectable()
export class FsService {
  constructor(
    @InjectRepository(F)
    private fRepository: TreeRepository<F>,
    @InjectRepository(FileDetail)
    private fileDetailRepository: Repository<FileDetail>,
    private readonly fileService: FileService,
  ) {}

  /**
   * 文件名称有重复的话，自动生成新文件名
   * @param createFDto 
   * @returns 
   */
  async getFileName (createFDto: {name:string, parentId:string}) {
    const fileRes = await this.fRepository.findOne({
      where: {
        name: createFDto.name,
        parent: { id: createFDto.parentId }
      } 
    });

    if (!fileRes) {
      return createFDto.name;
    }

    const fileListRes = await this.fRepository.find({
      where: {
        name: Like(`%${createFDto.name}%`),
        parent: { id: createFDto.parentId } 
      } 
    });
    if (fileListRes.length < 1) {
      return createFDto.name;
    }
    const regExp = new RegExp(`^${createFDto.name} (\\d+\\d*)$`);
    const list = fileListRes.filter(item => regExp.test(item.name));

    if (list.length === 0) {
      return `${createFDto.name} 2`;
    }

    const maxNum = max(list.map(item => Number(regExp.exec(item.name)[1])));
    return `${createFDto.name} ${maxNum + 1}`;
  }

  async create(createFDto: CreateFDto, options:{creator:string}) {
    const name = await this.getFileName(createFDto);

    let res = null;
    if (createFDto.pathType === PathType.FILE) {
      res = await this.fileDetailRepository.insert({ file: { id: createFDto.fileDetail.fileId } });
    }
    
    return this.fRepository.insert({
      name: name,
      parent: { id: createFDto.parentId },
      pathType: createFDto.pathType,
      fileDetail: createFDto.pathType === PathType.FILE ? { id: res.identifiers[0].id } : undefined,
      creator: { id: options.creator }
    });
  }

  findAll(query:GetAllFDto) {
    const boolMap = {
      'true': true,
      'false': false
    };
    return this.fRepository.find({
      relations: {
        creator: true,
        fileDetail: { file: true } 
      },
      where: { favorite: boolMap[query.favorite] }
    });
  }

  findChildren(parentId: string) {
    return this.fRepository.find({
      where: { parent: parentId !== 'null' ? { id: parentId } : IsNull() },
      relations: {
        creator: true,
        fileDetail: { file: true },
        parent: true
      },
      order: {
        pathType: 'DESC',
        name: 'ASC'
      }
    });
  }

  findOne(id: string) {
    return this.fRepository.findOne({ 
      where: { id },
      relations: {
        creator: true,
        fileDetail: { file: true }  
      }
    });
  }

  async findByPath(path: string) {
    const keys = path.split('/');
    const f = await keys.reduce<Promise<F>>(async (acc:Promise<F>, key:string, index) => {
      const fRes = await acc;
      const name = decodeURI(key);
      return await this.fRepository.findOne({
        where: {
          parent: { id: fRes.id },
          name: (index === keys.length - 1) ? name.split('.').splice(0, name.split('.').length - 1).join('.') : name
        },
        relations: { fileDetail: { file: { content: true } } }
      });
    }, (() => this.fRepository.findOne({ where: { parent: IsNull() } }))());
    return f;
  }

  update(id: string, updateFDto: UpdateFDto) {
    return this.fRepository.update(id, {
      name: updateFDto.name ? updateFDto.name : undefined,
      parent: updateFDto.parentId ? { id: updateFDto.parentId } : undefined,
      favorite: isBoolean(updateFDto.favorite) ? updateFDto.favorite : undefined
    });
  }

  async remove(id: string) {
    const f = await this.fRepository.findOne({ where: { id } });
    if (f.pathType === PathType.FILE) {
      return this.fRepository.delete(id);
    } else {
      const tree = await this.fRepository.findDescendantsTree(f, { relations: ['fileDetail'] });
      const flatFs = this.treeFlatChildren(tree);

      await flatFs.fs.reduce(async (acc, item) => {
        console.log(item.id);
        
        await acc;
        await this.fRepository.remove(item);
      }, Promise.resolve());

      await this.fileDetailRepository.remove(flatFs.files.map(item => item.fileDetail));
    }
  }

  treeFlatChildren (tree:F) {
    const files:F[] = [];
    const fs:F[] = [];

    const walk = (item:F) => {

      if (item.pathType === PathType.FILE) {
        files.push(item);
      } 
      fs.unshift(item);
      
      
      if (item.children.length > 0) {
        item.children.forEach(child => {
          walk(child);
        });
      }
    };

    walk(tree);

    return {
      files,
      fs 
    };
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.fRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        fileDetail: { file: true } 
      }
    });
    return {
      list,
      count 
    };
  }

  async unzipFile(id:string, options:{creator:string}) {
    const f = await this.fRepository.findOne({ 
      where: { id },
      relations: {
        fileDetail: { file: { content: true } },
        parent: true 
      }
    });

    const list = await unzipBuffer(f.fileDetail.file.content.buffer);
    const name = await this.getFileName({
      name: f.name,
      parentId: f.parent.id 
    });

    // console.log(name);
    list.forEach(item => {
      const names = item.originalname.split('/');
      names[0] = name;
      item.originalname = names.join('/');
    });
    
    await list.reduce<Promise<void>>(async (acc, item) => {
      await acc;

      const fileId = await this.fileService.create(item as Express.Multer.File);
      const names = item.originalname.split('/');

      let parentId = f.parent.id;
      return names.reduce<Promise<void>>(async (acc, item, index) => {
        await acc;

        let pathType = PathType.DIR;
        if (index === names.length - 1) {
          pathType = PathType.FILE;
        }
        // 判断当前时候有此文件
        const f1 = await this.fRepository.findOne({
          where: {
            name: pathType === PathType.FILE ? item.split('.').splice(0, item.split('.').length - 1).join('.') : item,
            parent: { id: parentId }
          } 
        });

        if (f1) {
          parentId = f1.id;
        } else {
          // 创建次文件
          
          let res = null;

          if (pathType === PathType.FILE) {
            res = await this.fileDetailRepository.insert({ file: { id: fileId } });
          }

          const newF = await this.fRepository.insert({
            name: pathType === PathType.FILE ? item.split('.').splice(0, item.split('.').length - 1).join('.') : item,
            parent: { id: parentId },
            pathType: pathType,
            fileDetail: pathType === PathType.FILE ? { id: res.identifiers[0].id } : undefined,
            creator: { id: options.creator }
          });
          
          parentId = newF.identifiers[0].id;
        }
        
      }, Promise.resolve());
    }, Promise.resolve());
  }

  async getParentPath(id: string) {
    const f = await this.fRepository.findOne({ where: { id } });
    const res = await this.fRepository.findAncestorsTree(f);

    const flat = [];
    let current = res;
    while (current.parent) {
      flat.unshift(cloneDeep(current.parent));
      current = current.parent;
    }

    return flat;
  }
}


function unzipBuffer(zipBuffer: Buffer): Promise<{originalname:string, buffer: Buffer, size: number}[]> {
  return new Promise((resolve, reject) => {
    // 从Buffer打开ZIP文件
    yauzl.fromBuffer(zipBuffer, { lazyEntries: true }, function(err, zipfile) {
      if (err) return reject(err);

      const fileDataList = [];

      zipfile.on('entry', function(entry) {
        // 忽略目录条目
        if (entry.fileName.endsWith('/')) {
          zipfile.readEntry(); // 继续下一个条目
          return;
        }

        // 获取文件内容
        zipfile.openReadStream(entry, function(err, readStream) {
          if (err) return reject(err);

          const chunks = [];
          readStream.on('data', function(chunk) {
            chunks.push(chunk);
          });
          readStream.on('end', function() {
            const fileData = Buffer.concat(chunks);
            fileDataList.push({
              buffer: fileData,
              size: entry.uncompressedSize,
              originalname: entry.fileName
              // 可以在这里添加更多文件信息，如uncompressedSize, modifiedTime等
            });

            zipfile.readEntry(); // 继续下一个条目
          });
        });
      });

      zipfile.once('error', reject);
      zipfile.once('end', () => resolve(fileDataList));
      zipfile.readEntry(); // 开始读取第一个条目
    });
  });
}