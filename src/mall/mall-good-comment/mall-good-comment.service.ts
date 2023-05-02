import { Injectable } from '@nestjs/common';
import { MallGoodComment } from './mall-good-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class MallGoodCommentService {
  
  constructor(
    @InjectRepository(MallGoodComment)
    private mallGoodCommentRepository: Repository<MallGoodComment>,
  ) {}

  create(data:{creatorId: string, goodId: string, content: string, images: string[]}) {
    return this.mallGoodCommentRepository.insert({
      content: data.content,
      creator: { id: data.creatorId },
      good: { id: data.goodId },
      images: data.images
    });
  }

  remove(id:string) {
    return this.mallGoodCommentRepository.delete(id);
  }

  findOne(id:string) {
    return this.mallGoodCommentRepository.findOne({ where: { id } });
  }

  async paginate(options: IPaginationOptions, filter: {goodId: string}) {
    const [list, count] = await this.mallGoodCommentRepository.findAndCount({
      where: { good: { id: filter.goodId } },
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        good: true
      }
    });
    return {
      list,
      count 
    };
  }

  async paginateWidthCursor(options:{count: number, afterId: string}, filter:{goodId: string}) {
    const comment = await this.findOne(options.afterId);
    const [list, count] = await this.mallGoodCommentRepository.findAndCount({
      where: {
        createDate: LessThan(comment.createDate),
        good: { id: filter.goodId }
      },
      order: { createDate: 'DESC' },
      take: options.count,
      relations: {
        creator: true,
        good: true
      }
    });
    return {
      list,
      count 
    };
  }
}
