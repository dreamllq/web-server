import { Injectable } from '@nestjs/common';
import { MallShop } from './mall-shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class MallShopService {
  constructor(
    @InjectRepository(MallShop)
    private mallShopRepository: Repository<MallShop>,
  ) {}

  create(data:{name: string, headimg: string, desc: string, creatorId:string}) {
    return this.mallShopRepository.insert({
      name: data.name,
      headimg: data.headimg,
      desc: data.desc,
      creator: { id: data.creatorId }
    });
  }

  remove(id: string) {
    return this.mallShopRepository.delete(id);
  }

  update(id, data:{name: string, headimg: string, desc: string}) {
    return this.mallShopRepository.update(id, {
      name: data.name,
      headimg: data.headimg,
      desc: data.desc
    });
  }

  findAll() {
    return this.mallShopRepository.find();
  }

  findOne(id: string) {
    return this.mallShopRepository.findOne({
      where: { id },
      relations: { creator: true }
    });
  }

  async paginate(options: IPaginationOptions, filter: { name: string }) {
    const [list, count] = await this.mallShopRepository.findAndCount({
      where: { name: Like(`%${filter.name}%`) },
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
