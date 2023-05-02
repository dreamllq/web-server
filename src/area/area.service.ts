import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  findOne(id) {
    return this.areaRepository.findBy({ id });
  }

  getAreasByParentId(parentId) {
    return this.areaRepository.findBy({ parentId: parentId });
  }

  async getTreeData() {
    const list: Area[] = await this.areaRepository.find();
    const obj = {};

    list.forEach(item => {
      const { id, parentId } = item;
      if (!obj[id]) {
        obj[id] = item;
      } else {
        const children = obj[id].children;
        obj[id] = item;
        obj[id].children = children;
      }


      if (obj[parentId]) {
        if (!Array.isArray(obj[parentId].children)) {
          obj[parentId].children = [];
        }

        obj[parentId].children.push(item);
      } else {
        obj[parentId] = { children: [item] };
      }
    });

    return obj[0].children;
  }
}