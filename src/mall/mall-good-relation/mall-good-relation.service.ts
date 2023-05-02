import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MallGoodRelation } from './mall-good-relation.entity';
import { Repository } from 'typeorm';
import { MallGoodRelationTypeEnum } from './mall-good-relation.type';

@Injectable()
export class MallGoodRelationService {
  
  constructor(
    @InjectRepository(MallGoodRelation)
    private mallGoodRelationRepository: Repository<MallGoodRelation>,
  ) {}

  create(data:{userId: string, goodId: string, type: MallGoodRelationTypeEnum}) {
    return this.mallGoodRelationRepository.insert({
      good: { id: data.goodId },
      user: { id: data.userId },
      type: data.type
    });
  }

  remove(id) {
    return this.mallGoodRelationRepository.delete(id);
  }

  findOneWidthFilter(data:{goodId:string, userId:string, type: MallGoodRelationTypeEnum}) {
    return this.mallGoodRelationRepository.findOne({
      where: {
        user: { id: data.userId },
        good: { id: data.goodId },
        type: data.type
      },
      relations: {
        user: true,
        good: true
      }
    });
  }

  findAll(data:{goodId:string, userId:string}) {
    return this.mallGoodRelationRepository.find({
      where: {
        user: { id: data.userId },
        good: { id: data.goodId }
      },
      relations: {
        user: true,
        good: true
      }
    });
  }
}
