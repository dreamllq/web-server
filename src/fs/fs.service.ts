import { Injectable } from '@nestjs/common';
import { CreateFDto } from './dto/create-f.dto';
import { UpdateFDto } from './dto/update-f.dto';
import { F } from './entities/f.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository, TreeRepository } from 'typeorm';
import { PathType } from './constants/path-type';
import { IPaginationOptions } from 'src/types';
import { FileDetail } from './entities/file-detail.entity';
import { max } from 'lodash';

@Injectable()
export class FsService {
  constructor(
    @InjectRepository(F)
    private fRepository: TreeRepository<F>,
    @InjectRepository(FileDetail)
    private fileDetailRepository: Repository<FileDetail>,
  ) {}

  /**
   * 文件名称有重复的话，自动生成新文件名
   * @param createFDto 
   * @returns 
   */
  async getFileName (createFDto: CreateFDto) {
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

  findAll() {
    return this.fRepository.find({
      relations: {
        creator: true,
        fileDetail: { file: true } 
      } 
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

  update(id: string, updateFDto: UpdateFDto) {
    return this.fRepository.update(id, {
      name: updateFDto.name ? updateFDto.name : undefined,
      parent: updateFDto.parentId ? { id: updateFDto.parentId } : undefined
    });
  }

  remove(id: string) {
    return this.fRepository.delete(id);
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
}
