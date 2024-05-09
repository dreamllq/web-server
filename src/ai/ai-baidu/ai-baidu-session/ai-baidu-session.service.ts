import { Injectable } from '@nestjs/common';
import { CreateAiBaiduSessionDto } from './dto/create-ai-baidu-session.dto';
import { UpdateAiBaiduSessionDto } from './dto/update-ai-baidu-session.dto';
import { AiBaiduSession } from './entities/ai-baidu-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';
import { AiBaiduMessageService } from '../ai-baidu-message/ai-baidu-message.service';

@Injectable()
export class AiBaiduSessionService {
  constructor(
    @InjectRepository(AiBaiduSession)
    private aiBaiduSessionRepository: Repository<AiBaiduSession>,
    private readonly aiBaiduMessageService: AiBaiduMessageService,
  ) {}

  create(createAiBaiduSessionDto: CreateAiBaiduSessionDto, options:{creator:string}) {
    return this.aiBaiduSessionRepository.insert({
      name: createAiBaiduSessionDto.name,
      account: { id: createAiBaiduSessionDto.accountId },
      service: { id: createAiBaiduSessionDto.serviceId },
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiBaiduSessionRepository.find({
      relations: {
        creator: true,
        service: true,
        account: true
      } 
    });
  }

  findOne(id: string) {
    return this.aiBaiduSessionRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        service: true,
        account: true
      } 
    });
  }

  update(id: string, updateAiBaiduSessionDto: UpdateAiBaiduSessionDto) {
    return this.aiBaiduSessionRepository.update(id, {
      name: updateAiBaiduSessionDto.name,
      service: { id: updateAiBaiduSessionDto.serviceId },
      account: { id: updateAiBaiduSessionDto.accountId }
    });
  }

  async remove(id: string) {
    await this.aiBaiduMessageService.removeBySessionId(id);
    await this.aiBaiduSessionRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiBaiduSessionRepository.findAndCount({
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
