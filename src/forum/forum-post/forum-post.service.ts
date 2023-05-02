import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ForumPost } from './forum-post.entity';
import { LessThan, Like, MoreThan, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class ForumPostService {
  constructor(
    @InjectRepository(ForumPost)
    private forumPostRepository: Repository<ForumPost>,
  ) {}

  findAll(data:{sectionId: string}) {
    return this.forumPostRepository.find({
      where: { section: { id: data.sectionId } },
      relations: { creator: true }
    });
  }

  findOne(id:string, config?:{relations?:{comments?: boolean, section?: boolean, zans?: boolean, collects?: boolean}}) {
    return this.forumPostRepository.findOne({ 
      where: { id },
      relations: {
        creator: true,
        section: config?.relations?.section ? { creator: true } : false,
        comments: config?.relations?.comments ? {
          creator: true,
          to: { creator: true }
        } : false,
        zans: config?.relations?.zans ? { creator: true } : false,
        collects: config?.relations?.collects ? { creator: true } : false
      }
    });
  }

  remove(id:string) {
    return this.forumPostRepository.delete(id);
  }

  create(data:{title: string, content: string, images:string[], creatorId: string, sectionId: string}) {

    return this.forumPostRepository.save(
      this.forumPostRepository.create(
        {
          title: data.title,
          content: data.content,
          images: data.images,
          creator: { id: data.creatorId },
          section: { id: data.sectionId }
        }
      )
    );
  }

  update(id, data:{title: string, content: string, images:string[]}) {
    return this.forumPostRepository.update(id, {
      title: data.title,
      content: data.content,
      images: data.images
    });
  }

  async paginate(options: IPaginationOptions, filter: { creatorId?: string, sectionId?: string, title?:string }, config?:{relations?:{comments?: boolean, section?: boolean, zans?:boolean, collects?: boolean}}) {
    const where: Parameters<typeof this.forumPostRepository.findAndCount>[0]['where'] = { section: { id: filter.sectionId } };
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    if (filter.title) {
      where.title = Like(`%${filter.title}%`);
    }
    const [list, count] = await this.forumPostRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        section: config?.relations?.section ? { creator: true } : false,
        comments: config?.relations?.comments ? {
          creator: true,
          to: { creator: true }
        } : false,
        zans: config?.relations?.zans ? { creator: true } : false,
        collects: config?.relations?.collects ? { creator: true } : false
      }
    });
    return {
      list,
      count 
    };
  }

  async paginateByCursor(options: {versionId:string, pageSize: number}, filter: { creatorId?: string, sectionId: string }, config?:{relations?:{comments?: boolean, section?: boolean, zans?:boolean, collects?: boolean}}) {
    const forumPost = await this.forumPostRepository.findOne({
      where: { id: options.versionId },
      order: { createDate: 'DESC' } 
    });
    const where: Parameters<typeof this.forumPostRepository.findAndCount>[0]['where'] = {
      section: { id: filter.sectionId },
      createDate: LessThan(forumPost.createDate) 
    };
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    const [list, count] = await this.forumPostRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      take: options.pageSize,
      relations: {
        creator: true,
        section: config?.relations?.section ? { creator: true } : false,
        comments: config?.relations?.comments ? {
          creator: true,
          to: { creator: true }
        } : false,
        zans: config?.relations?.zans ? { creator: true } : false,
        collects: config?.relations?.collects ? { creator: true } : false
      }
    });
    return {
      list,
      count 
    };
  }

  async getCount(data:{sectionId?: string, creatorId?: string} = {}) {
    const where: Parameters<typeof this.forumPostRepository.count>[0]['where'] = { };

    if (data.sectionId) {
      where.section = { id: data.sectionId };
    }

    if (data.creatorId) {
      where.creator = { id: data.creatorId };
    }

    return await this.forumPostRepository.count({ where });
  }
}
