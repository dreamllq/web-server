import { Injectable } from '@nestjs/common';
import { CreateAiBaiduServiceDto } from './dto/create-ai-baidu-service.dto';
import { UpdateAiBaiduServiceDto } from './dto/update-ai-baidu-service.dto';
import { AiBaiduService } from './entities/ai-baidu-service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class AiBaiduServiceService {
  constructor(
    @InjectRepository(AiBaiduService)
    private aiBaiduServiceRepository: Repository<AiBaiduService>,
  ) {}

  create(createAiBaiduServiceDto: CreateAiBaiduServiceDto, options:{creator:string}) {
    return this.aiBaiduServiceRepository.insert({
      name: createAiBaiduServiceDto.name,
      endpoint: createAiBaiduServiceDto.endpoint,
      path: createAiBaiduServiceDto.path,
      type: { id: createAiBaiduServiceDto.typeId },
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiBaiduServiceRepository.find({
      relations: {
        creator: true,
        type: true 
      } 
    });
  }

  findOne(id: string) {
    return this.aiBaiduServiceRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        type: true 
      } 
    });
  }

  update(id: string, updateAiBaiduServiceDto: UpdateAiBaiduServiceDto) {
    return this.aiBaiduServiceRepository.update(id, {
      name: updateAiBaiduServiceDto.name,
      endpoint: updateAiBaiduServiceDto.endpoint,
      path: updateAiBaiduServiceDto.path,
      type: { id: updateAiBaiduServiceDto.typeId }
    });
  }

  remove(id: string) {
    return this.aiBaiduServiceRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiBaiduServiceRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        type: true 
      }
    });
    return {
      list,
      count 
    };
  }
}
