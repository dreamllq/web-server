import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';
import { CreateBiChartSettingDto } from './dto/create-bi-chart-setting.dto';
import { UpdateBiChartSettingDto } from './dto/update-bi-chart-setting.dto';
import { BiChartSetting } from './entities/bi-chart-setting.entity';

@Injectable()
export class BiChartSettingService {
  constructor(
      @InjectRepository(BiChartSetting)
      private biChartSettingRepository: Repository<BiChartSetting>,
  ) {}
      
  create(metaId: string, data:CreateBiChartSettingDto) {
    return this.biChartSettingRepository.insert({
      config: data.config,
      chartMeta: { id: metaId } 
    });
  }
  findOne(metaId: string) {
    return this.biChartSettingRepository.findOne({ where: { chartMeta: { id: metaId } } });
  }
      
  update(id:string, data:UpdateBiChartSettingDto) {
    return this.biChartSettingRepository.update(id, { config: data.config });
  }
}
