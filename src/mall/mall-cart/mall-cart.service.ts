import { Injectable } from '@nestjs/common';
import { MallCart } from './mall-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class MallCartService {
  constructor(
    @InjectRepository(MallCart)
    private mallCartRepository: Repository<MallCart>,
  ) {}

  async add(data:{userId: string, goodId: string, count: number}) {
    const cartItem = await this.mallCartRepository.findOne({
      where: {
        good: { id: data.goodId },
        user: { id: data.userId }
      }
    });

    if (cartItem) {
      cartItem.count = cartItem.count + data.count;
      await this.mallCartRepository.save(cartItem);
    } else {
      this.mallCartRepository.insert({
        count: data.count,
        user: { id: data.userId },
        good: { id: data.goodId }
      });
    }

  }

  remove(id: string) {
    return this.mallCartRepository.delete(id);
  }

  update(id, data:{count?: number, checked?:boolean}) {
    return this.mallCartRepository.update(id, {
      count: data.count,
      checked: data.checked 
    });
  }

  batchUpdate(ids:string[], data:{checked?: boolean}) {
    return this.mallCartRepository.update({ id: In(ids) }, { checked: data.checked });
  }

  findAll(data:{userId: string}) {
    return this.mallCartRepository.find({
      where: { user: { id: data.userId } },
      order: { createDate: 'DESC' },
      relations: { good: true }
    });
  }
}
