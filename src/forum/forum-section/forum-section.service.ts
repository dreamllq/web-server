import { Injectable } from '@nestjs/common';
import { ForumSection } from './forum-section.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class ForumSectionService {
  constructor(
    @InjectRepository(ForumSection)
    private forumSectionRepository: Repository<ForumSection>,
  ) {}

  findAll() {
    return this.forumSectionRepository.find({ relations: { creator: true } });
  }

  create(data:{name: string, desc:string, creatorId: string}) {
    return this.forumSectionRepository.insert({
      name: data.name,
      desc: data.desc,
      creator: { id: data.creatorId }
    });
  }

  remove(id:string) {
    return this.forumSectionRepository.delete(id);
  }

  findOne(id: string) {
    return this.forumSectionRepository.findOne({
      where: { id },
      relations: { creator: true } 
    });
  }

  update(id, data:{name: string, desc:string}) {
    return this.forumSectionRepository.update(id, {
      name: data.name,
      desc: data.desc 
    });
  }

  async paginate(options: IPaginationOptions, filter: { name: string, creatorId?: string }) {
    const where: Parameters<typeof this.forumSectionRepository.findAndCount>[0]['where'] = { name: Like(`%${filter.name}%`) };
    
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    const [list, count] = await this.forumSectionRepository.findAndCount({
      where,
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
