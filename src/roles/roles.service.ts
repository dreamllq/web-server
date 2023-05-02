import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, IPaginationResult } from 'src/types';
import { DeleteResult, In, Like, Repository } from 'typeorm';
import { Role } from './role.entity';
import { ResourcesService } from 'src/resources/resources.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private readonly resourcesService: ResourcesService
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: { resources: true } });
  }

  findOne(id:string): Promise<Role> {
    return this.rolesRepository.findOne({
      where: { id },
      relations: { resources: true } 
    });
  }

  async create(role, userId) {
    const resources = await this.resourcesService.findByIds(role.resourceIds);
    const user = new User();
    user.id = userId;

    const roleEntity = new Role();
    roleEntity.name = role.name;
    roleEntity.desc = role.desc;
    roleEntity.creator = user;
    roleEntity.resources = resources;

    return this.rolesRepository.save(roleEntity);
  }

  remove(id:string): Promise<DeleteResult> {
    return this.rolesRepository.delete(id);
  }

  async update(id:string, roleOption) {
    const role = await this.rolesRepository.findOne({
      where: { id: id },
      relations: { resources: true } 
    });
    const resources = await this.resourcesService.findByIds(roleOption.resourceIds);

    role.desc = roleOption.desc;
    role.resources = resources;
    return this.rolesRepository.save(role);
  }

  async paginate(options: IPaginationOptions, filter:{name: string}): Promise<IPaginationResult<Role>> {
    const list = await this.rolesRepository.find({
      where: { name: Like(`%${ filter.name }%`) },
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: { resources: true }
    });

    const count = await this.rolesRepository.count({ where: { name: Like(`%${ filter.name }%`) } });

    return {
      list,
      count 
    };
  }

  findByIds(ids) {
    return this.rolesRepository.find({ where: { id: In(ids || []) } }); 
  }
}
