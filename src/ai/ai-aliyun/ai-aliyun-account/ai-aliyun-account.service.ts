import { Injectable } from '@nestjs/common';
import { CreateAiAliyunAccountDto } from './dto/create-ai-aliyun-account.dto';
import { UpdateAiAliyunAccountDto } from './dto/update-ai-aliyun-account.dto';
import { AiAliyunAccount } from './entities/ai-aliyun-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class AiAliyunAccountService {
  constructor(
    @InjectRepository(AiAliyunAccount)
    private aiAliyunAccountRepository: Repository<AiAliyunAccount>,
  ) {}

  create(createAiAliyunAccountDto: CreateAiAliyunAccountDto, options:{creator:string}) {
    return this.aiAliyunAccountRepository.insert({
      name: createAiAliyunAccountDto.name,
      accessKey: createAiAliyunAccountDto.accessKey,
      secretKey: createAiAliyunAccountDto.secretKey,
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiAliyunAccountRepository.find({ relations: { creator: true } });
  }

  findOne(id: string) {
    return this.aiAliyunAccountRepository.findOne({
      where: { id },
      relations: { creator: true } 
    });
  }

  update(id: string, updateAiAliyunAccountDto: UpdateAiAliyunAccountDto) {
    return this.aiAliyunAccountRepository.update(id, {
      accessKey: updateAiAliyunAccountDto.accessKey,
      name: updateAiAliyunAccountDto.name,
      secretKey: updateAiAliyunAccountDto.secretKey
    });
  }

  remove(id: string) {
    return this.aiAliyunAccountRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiAliyunAccountRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: { creator: true }
    });
    return {
      list,
      count 
    };
  }
}
