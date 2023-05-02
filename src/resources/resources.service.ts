import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, IPaginationResult } from 'src/types';
import { DeleteResult, In, InsertResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdatePartialResourceDto } from './dtos/update-partial-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { Resource } from './resource.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>
  ) {} 

  findAll(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  findByIds(ids) {
    return this.resourceRepository.find({ where: { id: In(ids || []) } });
  }

  findOne(id:string): Promise<Resource> {
    return this.resourceRepository.findOneBy({ id });
  }

  create(resource:CreateResourceDto): Promise<InsertResult> {
    return this.resourceRepository.insert(resource);  
  }

  remove(id:string): Promise<DeleteResult> {
    return this.resourceRepository.delete(id);
  }

  update(id:string, resource: UpdateResourceDto) {
    return this.resourceRepository.update({ id: id }, resource);
  }

  updatePartial(id, resource:UpdatePartialResourceDto): Promise<UpdateResult> {
    return this.resourceRepository.update({ id: id }, resource);
  }

  async paginate(options: IPaginationOptions, filter): Promise<IPaginationResult<Resource>> {
    const list = await this.resourceRepository.find({
      where: { name: Like(`%${ filter.name }%`) },
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize
    });

    const count = await this.resourceRepository.count({ where: { name: Like(`%${ filter.name }%`) } });

    return {
      list,
      count 
    };
  }
}
