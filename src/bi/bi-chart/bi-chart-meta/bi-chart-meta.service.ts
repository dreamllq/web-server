import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';
import { CreateBiChartMetaDto } from './dto/create-bi-chart-meta.dto';
import { UpdateBiChartMetaDto } from './dto/update-bi-chart-meta.dto';
import { BiChartMeta } from './entities/bi-chart-meta.entity';

@Injectable()
export class BiChartMetaService {
  constructor(
    @InjectRepository(BiChartMeta)
    private biChartMetaRepository: Repository<BiChartMeta>,
  ) {}
  findAll() {
    return this.biChartMetaRepository.find({
      relations: {
        creator: true,
        data: true 
      } 
    });
  }
    
  create(data:CreateBiChartMetaDto & { creatorId: string }) {
    return this.biChartMetaRepository.insert({
      name: data.name,
      desc: data.desc,
      data: { id: data.data.id },
      creator: { id: data.creatorId }
    });
  }
    
  remove(id:string) {
    return this.biChartMetaRepository.delete(id);
  }
    
  findOne(id: string) {
    return this.biChartMetaRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        data: true 
      } 
    });
  }
    
  update(id:string, data:UpdateBiChartMetaDto) {
    return this.biChartMetaRepository.update(id, {
      name: data.name,
      desc: data.desc,
      data: { id: data.data.id }
    });
  }
    
  async paginate(options: IPaginationOptions, filter: { name: string, creatorId?: string }) {
    const where: Parameters<typeof this.biChartMetaRepository.findAndCount>[0]['where'] = { name: Like(`%${filter.name}%`) };
        
    if (filter.creatorId) {
      where.creator = { id: filter.creatorId }; 
    }
    const [list, count] = await this.biChartMetaRepository.findAndCount({
      where,
      order: { createDate: 'DESC' },
      skip: (options.pageNo - 1) * options.pageSize,
      take: options.pageSize,
      relations: {
        creator: true,
        data: true 
      }
    });
    return {
      list,
      count 
    };
  }
}
