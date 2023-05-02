import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { MallOrder } from './mall-order.entity';
import { CreateOrderData, MallOrderStatusEnum } from './mall-order.type';
import { MallOrderGood } from './mall-order-good.entity';
import { MallGoodService } from '../mall-good/mall-good.service';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class MallOrderService {
  constructor(
    @InjectRepository(MallOrder)
    private mallOrderRepository: Repository<MallOrder>,
    @InjectRepository(MallOrderGood)
    private mallOrderGoodRepository: Repository<MallOrderGood>,
    private readonly mallGoodService: MallGoodService
  ) {}

  async create(data:CreateOrderData) {
    const goods = await Promise.all(data.goods.map(async (good) => {
      const mallGood = await this.mallGoodService.findOne(good.goodId);
      const orderGood = this.mallOrderGoodRepository.create({
        count: good.count,
        good: mallGood,
        price: mallGood.price
      });

      return orderGood;
    }));

    const price = goods.reduce((acc, g) => acc + (g.price * g.count), 0);

    const order = this.mallOrderRepository.create({
      address: { id: data.addressId },
      creator: { id: data.creatorId },
      price,
      status: MallOrderStatusEnum.WaitPay
    });

    await this.mallOrderRepository.save(order);

    goods.forEach(g => {
      g.order = order;
    });
    await this.mallOrderGoodRepository.save(goods);
  }

  findOne(id:string) {
    return this.mallOrderRepository.findOne({
      where: { id },
      relations: {
        goods: { good: true },
        creator: true,
        address: true 
      } 
    });
  }

  async paginate(options: IPaginationOptions) {
    const [list, count] = await this.mallOrderRepository.findAndCount({
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        goods: { good: true }
      }
    });
    return {
      list,
      count 
    };
  }

  async paginateWidthCursor(options:{count: number, afterId: string}, filter:{creatorId?:string}) {
    const order = await this.findOne(options.afterId);
    const [list, count] = await this.mallOrderRepository.findAndCount({
      where: {
        createDate: LessThan(order.createDate),
        creator: { id: filter.creatorId } 
      },
      order: { createDate: 'DESC' },
      take: options.count,
      relations: {
        creator: true,
        goods: { good: true }
      }
    });
    return {
      list,
      count 
    };
  }
}
