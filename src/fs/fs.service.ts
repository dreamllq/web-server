import { Injectable } from '@nestjs/common';
import { CreateFDto } from './dto/create-f.dto';
import { UpdateFDto } from './dto/update-f.dto';
import { F } from './entities/f.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PathType } from './constants/path-type';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class FsService {
  constructor(
    @InjectRepository(F)
    private fRepository: Repository<F>,
  ) {}
  create(createFDto: CreateFDto, options:{creator:string}) {
    return this.fRepository.insert({
      name: createFDto.name,
      parent: { id: createFDto.parentId },
      pathType: createFDto.pathType,
      fileDetail: createFDto.pathType === PathType.FILE ? { file: { id: createFDto.fileDetail.fileId } } : undefined,
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.fRepository.find({
      relations: {
        creator: true,
        fileDetail: true 
      } 
    });
  }

  findOne(id: string) {
    return this.fRepository.findOne({ 
      where: { id },
      relations: {
        creator: true,
        fileDetail: true 
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
        fileDetail: true
      }
    });
    return {
      list,
      count 
    };
  }
}
