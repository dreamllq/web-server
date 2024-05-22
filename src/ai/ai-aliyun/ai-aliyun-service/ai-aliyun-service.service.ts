import { Injectable } from '@nestjs/common';
import { CreateAiAliyunServiceDto } from './dto/create-ai-aliyun-service.dto';
import { UpdateAiAliyunServiceDto } from './dto/update-ai-aliyun-service.dto';
import { AiAliyunService } from './entities/ai-aliyun-service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class AiAliyunServiceService {

  constructor(
    @InjectRepository(AiAliyunService)
    private aiAliyunServiceRepository: Repository<AiAliyunService>,
  ) {}

  create(createAiAliyunServiceDto: CreateAiAliyunServiceDto, options:{creator:string}) {
    return this.aiAliyunServiceRepository.insert({
      name: createAiAliyunServiceDto.name,
      endpoint: createAiAliyunServiceDto.endpoint,
      path: createAiAliyunServiceDto.path,
      model: createAiAliyunServiceDto.model,
      type: { id: createAiAliyunServiceDto.typeId },
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiAliyunServiceRepository.find({
      relations: {
        creator: true,
        type: true 
      } 
    });
  }

  findOne(id: string) {
    return this.aiAliyunServiceRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        type: true 
      } 
    });
  }

  update(id: string, updateAiAliyunServiceDto: UpdateAiAliyunServiceDto) {
    return this.aiAliyunServiceRepository.update(id, {
      name: updateAiAliyunServiceDto.name,
      endpoint: updateAiAliyunServiceDto.endpoint,
      path: updateAiAliyunServiceDto.path,
      model: updateAiAliyunServiceDto.model,
      type: { id: updateAiAliyunServiceDto.typeId }
    });
  }

  remove(id: string) {
    return this.aiAliyunServiceRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiAliyunServiceRepository.findAndCount({
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
