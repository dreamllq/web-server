import { Injectable } from '@nestjs/common';
import { ForumComment } from './forum-comment.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class ForumCommentService {
  constructor(
    @InjectRepository(ForumComment)
    private forumCommentRepository: Repository<ForumComment>,
  ) {}

  create(data:{content: string, toCommentId?:string, creatorId: string, postId: string, images:string[]}) {
    const entity: Parameters<typeof this.forumCommentRepository.insert>[0] = { 
      content: data.content,
      creator: { id: data.creatorId },
      post: { id: data.postId },
      images: data.images
    };

    if (data.toCommentId) {
      entity.to = { id: data.toCommentId };
    }

    return this.forumCommentRepository.insert(entity);
  }
  
  remove(id: string) {
    return this.forumCommentRepository.delete(id);
  }

  findAll(data:{ postId: string }) {
    return this.forumCommentRepository.find({
      where: { post: { id: data.postId } },
      relations: {
        to: { creator: true },
        creator: true
      }
    });
  }

  findOne(id) {
    return this.forumCommentRepository.findOne({
      where: { id },
      relations: {
        to: { creator: true },
        creator: true,
        post: {
          section: { creator: true },
          creator: true 
        }
      }
    });
  }

  async paginate(options: IPaginationOptions, filter: { creatorId?: string, postId?: string, content?:string }) {
    const where: Parameters<typeof this.forumCommentRepository.findAndCount>[0]['where'] = { post: { id: filter.postId } };
    
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    if (filter.content) {
      where.content = Like(`%${filter.content}%`);
    }
    const [list, count] = await this.forumCommentRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        to: { creator: true }
      }
    });
    return {
      list,
      count 
    };
  }

  async getCount(data:{creatorId?:string, postId?:string}) {
    const where: Parameters<typeof this.forumCommentRepository.findAndCount>[0]['where'] = { };

    if (data.creatorId) {
      where.creator = { id: data.creatorId };
    }

    if (data.postId) {
      where.post = { id: data.postId };
    }

    return this.forumCommentRepository.count({ where });
  }
}
