import { Injectable } from '@nestjs/common';
import { CreateAiAliyunSessionDto } from './dto/create-ai-aliyun-session.dto';
import { UpdateAiAliyunSessionDto } from './dto/update-ai-aliyun-session.dto';
import { AiAliyunSession } from './entities/ai-aliyun-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';
import { AiAliyunMessageService } from '../ai-aliyun-message/ai-aliyun-message.service';

@Injectable()
export class AiAliyunSessionService {
  constructor(
    @InjectRepository(AiAliyunSession)
    private readonly aiAliyunSessionRepository: Repository<AiAliyunSession>,
    private readonly aiAliyunMessageService: AiAliyunMessageService,
  ) {}

  create(createAiAliyunSessionDto: CreateAiAliyunSessionDto, options:{creator:string}) {
    return this.aiAliyunSessionRepository.insert({
      name: createAiAliyunSessionDto.name,
      account: { id: createAiAliyunSessionDto.accountId },
      service: { id: createAiAliyunSessionDto.serviceId },
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiAliyunSessionRepository.find({
      relations: {
        creator: true,
        service: true,
        account: true
      } 
    });
  }

  findOne(id: string) {
    return this.aiAliyunSessionRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        service: true,
        account: true
      } 
    });
  }

  update(id: string, updateAiAliyunSessionDto: UpdateAiAliyunSessionDto) {
    return this.aiAliyunSessionRepository.update(id, {
      name: updateAiAliyunSessionDto.name,
      service: { id: updateAiAliyunSessionDto.serviceId },
      account: { id: updateAiAliyunSessionDto.accountId }
    });
  }

  async remove(id: string) {
    await this.aiAliyunMessageService.removeBySessionId(id);
    await this.aiAliyunSessionRepository.delete(id);
  }
  
  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiAliyunSessionRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        service: true,
        account: true
      }
    });
    return {
      list,
      count 
    };
  }
}
