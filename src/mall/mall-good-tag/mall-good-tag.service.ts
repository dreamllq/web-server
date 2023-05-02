import { Injectable } from '@nestjs/common';
import { MallGoodTag } from './mall-good-tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class MallGoodTagService {
  constructor(
    @InjectRepository(MallGoodTag)
    private mallGoodTagRepository: Repository<MallGoodTag>,
  ) {}

  create(data: {name: string, desc: string}) {
    return this.mallGoodTagRepository.insert({
      name: data.name,
      desc: data.desc 
    });
  }

  remove(id: string) {
    return this.mallGoodTagRepository.delete(id);
  }

  update(id, data:{desc: string}) {
    return this.mallGoodTagRepository.update(id, { desc: data.desc });
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.mallGoodTagRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize
    });
    return {
      list,
      count 
    };
  }

  findOne(id: string) {
    return this.mallGoodTagRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.mallGoodTagRepository.find();
  }
}
