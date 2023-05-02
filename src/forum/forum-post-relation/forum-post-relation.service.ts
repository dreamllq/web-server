import { Injectable } from '@nestjs/common';
import { ForumPostRelation } from './forum-post-relation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForumPostRelationTypeEnum } from './forum-post-relation.type';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class ForumPostRelationService {
  constructor(
    @InjectRepository(ForumPostRelation)
    private forumPostCollectRepository: Repository<ForumPostRelation>,
  ) {}

  create(data:{creatorId:string, postId:string, type: ForumPostRelationTypeEnum}) {
    return this.forumPostCollectRepository.insert({
      creator: { id: data.creatorId },
      post: { id: data.postId },
      type: data.type
    });
  }

  remove(id:string) {
    return this.forumPostCollectRepository.delete(id);
  }

  findAll(data:{creatorId?:string, postId?:string, type?: ForumPostRelationTypeEnum } = {}) {
    const where: Parameters<typeof this.forumPostCollectRepository.find>[0]['where'] = { };

    if (data.creatorId) {
      where.creator = { id: data.creatorId };
    }

    if (data.postId) {
      where.post = { id: data.postId };
    }

    if (data.type) {
      where.type = data.type;
    }

    return this.forumPostCollectRepository.find({
      where,
      relations: {
        creator: true,
        post: {
          creator: true,
          section: { creator: true } 
        }
      }
    });

  }

  findOne(id) {
    return this.forumPostCollectRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        post: {
          creator: true,
          section: { creator: true } 
        }
      }
    });
  }

  async paginate(options: IPaginationOptions, filter: { creatorId?: string, postId: string, type?: ForumPostRelationTypeEnum }) {
    const where: Parameters<typeof this.forumPostCollectRepository.findAndCount>[0]['where'] = {};

    if (filter.postId) {
      where.post = { id: filter.postId };
    }
    
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }

    if (filter.type) {
      where.type = filter.type;
    }
    const [list, count] = await this.forumPostCollectRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        post: {
          creator: true,
          section: { creator: true }
        }
      }
    });
    return {
      list,
      count 
    };
  }

  getCount(data:{postId?: string, creator?:string, type?: ForumPostRelationTypeEnum}) {
    const where: Parameters<typeof this.forumPostCollectRepository.count>[0]['where'] = {};
    if (data.postId) where.post = { id: data.postId };
    if (data.creator) where.creator = { id: data.creator };
    if (data.type) where.type = data.type;
    return this.forumPostCollectRepository.count({ where });
  }
}
