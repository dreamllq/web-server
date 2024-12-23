import { Injectable } from '@nestjs/common';
import { CreateFDto } from './dto/create-f.dto';
import { UpdateFDto } from './dto/update-f.dto';
import { F } from './entities/f.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, TreeRepository } from 'typeorm';
import { PathType } from './constants/path-type';
import { IPaginationOptions } from 'src/types';
import { FileDetail } from './entities/file-detail.entity';

@Injectable()
export class FsService {
  constructor(
    @InjectRepository(F)
    private fRepository: TreeRepository<F>,
    @InjectRepository(FileDetail)
    private fileDetailRepository: Repository<FileDetail>,
  ) {}
  async create(createFDto: CreateFDto, options:{creator:string}) {
    let res = null;
    if (createFDto.pathType === PathType.FILE) {
      res = await this.fileDetailRepository.insert({ file: { id: createFDto.fileDetail.fileId } });
    }
    
    return this.fRepository.insert({
      name: createFDto.name,
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
      name: updateFDto.name,
      parent: { id: updateFDto.parentId }
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
