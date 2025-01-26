import { Injectable } from '@nestjs/common';
import { CreateBiChartMetaDto } from './dto/create-bi-chart-meta.dto';
import { UpdateBiChartMetaDto } from './dto/update-bi-chart-meta.dto';

@Injectable()
export class BiChartMetaService {
  create(createBiChartMetaDto: CreateBiChartMetaDto) {
    return 'This action adds a new biChartMeta';
  }

  findAll() {
    return `This action returns all biChartMeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biChartMeta`;
  }

  update(id: number, updateBiChartMetaDto: UpdateBiChartMetaDto) {
    return `This action updates a #${id} biChartMeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} biChartMeta`;
  }
}
