import { Injectable } from '@nestjs/common';
import { CreateAiBaiduSessionDto } from './dto/create-ai-baidu-session.dto';
import { UpdateAiBaiduSessionDto } from './dto/update-ai-baidu-session.dto';
import { AiBaiduSession } from './entities/ai-baidu-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class AiBaiduSessionService {
  constructor(
    @InjectRepository(AiBaiduSession)
    private aiBaiduSessionRepository: Repository<AiBaiduSession>,
  ) {}

  create(createAiBaiduSessionDto: CreateAiBaiduSessionDto, options:{creator:string}) {
    return this.aiBaiduSessionRepository.insert({
      name: createAiBaiduSessionDto.name,
      service: { id: createAiBaiduSessionDto.serviceId },
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiBaiduSessionRepository.find({
      relations: {
        creator: true,
        service: true 
      } 
    });
  }

  findOne(id: string) {
    return this.aiBaiduSessionRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        service: true 
      } 
    });
  }

  update(id: string, updateAiBaiduSessionDto: UpdateAiBaiduSessionDto) {
    return this.aiBaiduSessionRepository.update(id, {
      name: updateAiBaiduSessionDto.name,
      service: { id: updateAiBaiduSessionDto.serviceId }
    });
  }

  remove(id: string) {
    return this.aiBaiduSessionRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiBaiduSessionRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        service: true 
      }
    });
    return {
      list,
      count 
    };
  }
}
