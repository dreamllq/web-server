import { Injectable } from '@nestjs/common';
import { CreateBiViewMetaDto } from './dto/create-bi-view-meta.dto';
import { UpdateBiViewMetaDto } from './dto/update-bi-view-meta.dto';

@Injectable()
export class BiViewMetaService {
  create(createBiViewMetaDto: CreateBiViewMetaDto) {
    return 'This action adds a new biViewMeta';
  }

  findAll() {
    return `This action returns all biViewMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biViewMeta`;
  }

  update(id: number, updateBiViewMetaDto: UpdateBiViewMetaDto) {
    return `This action updates a #${id} biViewMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} biViewMeta`;
  }
}
