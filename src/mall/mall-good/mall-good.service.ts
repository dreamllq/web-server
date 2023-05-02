import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MallGood } from './mall-good.entity';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class MallGoodService {
  constructor(
    @InjectRepository(MallGood)
    private mallGoodRepository: Repository<MallGood>,
  ) {}

  create(data:{title: string, desc:string, groupId: string, headimg: string, price: number, images:string[], detail: string, creatorId: string, shopId: string}) {
    return this.mallGoodRepository.insert({
      title: data.title,
      desc: data.desc,
      group: { id: data.groupId },
      headimg: data.headimg,
      price: data.price,
      images: data.images,
      detail: data.detail,
      creator: { id: data.creatorId },
      shop: { id: data.shopId }
    });
  }

  remove(id:string) {
    return this.mallGoodRepository.delete(id);
  }

  update(id: string, data: {title: string, desc:string, groupId: string, headimg: string, price: number, images:string[], detail: string}) {
    return this.mallGoodRepository.update(id, {
      title: data.title,
      desc: data.desc,
      group: { id: data.groupId },
      headimg: data.headimg,
      price: data.price,
      images: data.images,
      detail: data.detail
    });
  }

  findAll(data:{shopId: string}) {
    return this.mallGoodRepository.find({ where: { shop: { id: data.shopId } } });
  }

  findOne(id:string) {
    return this.mallGoodRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        shop: true,
        group: true
      } 
    });
  }

  async paginate(options: IPaginationOptions, filter: { shopId?: string, title?: string }) {
    const where: Parameters<typeof this.mallGoodRepository.findAndCount>[0]['where'] = { title: Like(`%${filter.title}%`) };
    if (filter.shopId) {
      where.shop = { id: filter.shopId };
    }

    const [list, count] = await this.mallGoodRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        shop: true,
        group: true
      }
    });
    return {
      list,
      count 
    };
  }
}
