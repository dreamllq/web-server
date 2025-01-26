import { Injectable } from '@nestjs/common';
import { CreateBiDataMetaDto } from './dto/create-bi-data-meta.dto';
import { UpdateBiDataMetaDto } from './dto/update-bi-data-meta.dto';

@Injectable()
export class BiDataMetaService {
  create(createBiDataMetaDto: CreateBiDataMetaDto) {
    return 'This action adds a new biDataMeta';
  }

  findAll() {
    return `This action returns all biDataMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biDataMeta`;
  }

  update(id: number, updateBiDataMetaDto: UpdateBiDataMetaDto) {
    return `This action updates a #${id} biDataMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} biDataMeta`;
  }
}
