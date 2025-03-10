import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';
import { CreateBiViewMetaDto } from './dto/create-bi-view-meta.dto';
import { UpdateBiViewMetaDto } from './dto/update-bi-view-meta.dto';
import { BiViewMeta } from './entities/bi-view-meta.entity';

@Injectable()
export class BiViewMetaService {
  constructor(
      @InjectRepository(BiViewMeta)
      private biViewMetaRepository: Repository<BiViewMeta>,
  ) {}
  findAll() {
    return this.biViewMetaRepository.find({ relations: { creator: true } });
  }
  
  create(data:CreateBiViewMetaDto & {creatorId: string}) {
    return this.biViewMetaRepository.insert({
      name: data.name,
      desc: data.desc,
      creator: { id: data.creatorId }
    });
  }
  
  remove(id:string) {
    return this.biViewMetaRepository.delete(id);
  }
  
  findOne(id: string) {
    return this.biViewMetaRepository.findOne({
      where: { id },
      relations: { creator: true }
    });
  }
  
  update(id:string, data:UpdateBiViewMetaDto) {
    return this.biViewMetaRepository.update(id, {
      name: data.name,
      desc: data.desc 
    });
  }
  
  async paginate(options: IPaginationOptions, filter: { name: string, creatorId?: string }) {
    const where: Parameters<typeof this.biViewMetaRepository.findAndCount>[0]['where'] = { name: Like(`%${filter.name}%`) };
      
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    const [list, count] = await this.biViewMetaRepository.findAndCount({
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
