import { Injectable } from '@nestjs/common';
import { CreateAiBaiduAccountDto } from './dto/create-ai-baidu-account.dto';
import { UpdateAiBaiduAccountDto } from './dto/update-ai-baidu-account.dto';
import { IPaginationOptions } from 'src/types';
import { InjectRepository } from '@nestjs/typeorm';
import { AiBaiduAccount } from './entities/ai-baidu-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AiBaiduAccountService {
  constructor(
    @InjectRepository(AiBaiduAccount)
    private aiBaiduAccountRepository: Repository<AiBaiduAccount>,
  ) {}

  create(createAiBaiduAccountDto: CreateAiBaiduAccountDto, options:{creator:string}) {
    return this.aiBaiduAccountRepository.insert({
      name: createAiBaiduAccountDto.name,
      accessKey: createAiBaiduAccountDto.accessKey,
      secretKey: createAiBaiduAccountDto.secretKey,
      creator: { id: options.creator }
    });
  }

  findAll() {
    return this.aiBaiduAccountRepository.find({ relations: { creator: true } });
  }

  findOne(id: string) {
    return this.aiBaiduAccountRepository.findOne({
      where: { id },
      relations: { creator: true } 
    });
  }

  update(id: string, updateAiBaiduAccountDto: UpdateAiBaiduAccountDto) {
    return this.aiBaiduAccountRepository.update(id, {
      accessKey: updateAiBaiduAccountDto.accessKey,
      name: updateAiBaiduAccountDto.name,
      secretKey: updateAiBaiduAccountDto.secretKey
    });
  }

  remove(id: string) {
    return this.aiBaiduAccountRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.aiBaiduAccountRepository.findAndCount({
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
