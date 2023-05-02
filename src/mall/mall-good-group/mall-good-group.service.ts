import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MallGoodGroup } from './mall-good-group.entity';
import { Repository, TreeRepository } from 'typeorm';

@Injectable()
export class MallGoodGroupService {
  constructor(
    @InjectRepository(MallGoodGroup)
    private mallGoodGroupRepository: TreeRepository<MallGoodGroup>,
  ) {}

  create(data:{name:string, headimg?:string, parentId?:string, creatorId: string}) {
    return this.mallGoodGroupRepository.insert({
      name: data.name,
      headimg: data.headimg,
      parent: { id: data.parentId },
      creator: { id: data.creatorId }
    });
  }

  findTrees() {
    return this.mallGoodGroupRepository.findTrees();
  }

  findAll() {
    return this.mallGoodGroupRepository.find();
  }

  findOne(id:string) {
    return this.mallGoodGroupRepository.findOne({ where: { id } });
  }

  update(id, data:{name: string, headimg: string}) {
    return this.mallGoodGroupRepository.update(id, {
      name: data.name,
      headimg: data.headimg
    });
  }

  remove(id:string) {
    return this.mallGoodGroupRepository.delete(id);
  }
}
