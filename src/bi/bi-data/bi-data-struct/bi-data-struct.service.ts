import { CreateBiDataStructDto } from './dto/create-bi-data-struct.dto';
import { UpdateBiDataStructDto } from './dto/update-bi-data-struct.dto';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BiDataStruct } from './entities/bi-data-struct.entity';
@Injectable()
export class BiDataStructService {
  constructor(
        @InjectRepository(BiDataStruct)
        private biDataStructRepository: Repository<BiDataStruct>,
  ) {}
  findAll(metaId:string) {
    return this.biDataStructRepository.find({ where: { meta: { id: metaId } } });
  }
    
  create(metaId:string, data:CreateBiDataStructDto) {
    return this.biDataStructRepository.insert({
      name: data.name,
      desc: data.desc,
      type: data.type,
      group: data.group,
      meta: { id: metaId }
    });
  }
    
  remove(id:string) {
    return this.biDataStructRepository.delete(id);
  }
    
  findOne(id: string) {
    return this.biDataStructRepository.findOne({ where: { id } });
  }
    
  update(id:string, data:UpdateBiDataStructDto) {
    return this.biDataStructRepository.update(id, {
      name: data.name,
      desc: data.desc,
      type: data.type,
      group: data.group
    });
  }
}
