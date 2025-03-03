import { CreateBiDataMetaDto } from './dto/create-bi-data-meta.dto';
import { UpdateBiDataMetaDto } from './dto/update-bi-data-meta.dto';
import { BiDataMeta } from './entities/bi-data-meta.entity';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';

@Injectable()
export class BiDataMetaService {
  constructor(
      @InjectRepository(BiDataMeta)
      private biDataMetaRepository: Repository<BiDataMeta>,
  ) {}
  findAll() {
    return this.biDataMetaRepository.find({ relations: { creator: true } });
  }
  
  create(data:{name: string, desc:string, creatorId: string}) {
    return this.biDataMetaRepository.insert({
      name: data.name,
      desc: data.desc,
      creator: { id: data.creatorId }
    });
  }
  
  remove(id:string) {
    return this.biDataMetaRepository.delete(id);
  }
  
  findOne(id: string) {
    return this.biDataMetaRepository.findOne({
      where: { id },
      relations: { creator: true } 
    });
  }
  
  update(id, data:{name: string, desc:string}) {
    return this.biDataMetaRepository.update(id, {
      name: data.name,
      desc: data.desc 
    });
  }
  
  async paginate(options: IPaginationOptions, filter: { name: string, creatorId?: string }) {
    const where: Parameters<typeof this.biDataMetaRepository.findAndCount>[0]['where'] = { name: Like(`%${filter.name}%`) };
      
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    const [list, count] = await this.biDataMetaRepository.findAndCount({
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
