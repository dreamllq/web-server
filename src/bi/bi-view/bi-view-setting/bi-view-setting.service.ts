import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/types';
import { CreateBiViewSettingDto } from './dto/create-bi-view-setting.dto';
import { UpdateBiViewSettingDto } from './dto/update-bi-view-setting.dto';
import { BiViewSetting } from './entities/bi-view-setting.entity';

@Injectable()
export class BiViewSettingService {
  constructor(
        @InjectRepository(BiViewSetting)
        private biViewSettingRepository: Repository<BiViewSetting>,
  ) {}
        
  create(metaId: string, data:CreateBiViewSettingDto) {
    return this.biViewSettingRepository.insert({
      config: data.config,
      viewMeta: { id: metaId } 
    });
  }
  findOne(metaId: string) {
    return this.biViewSettingRepository.findOne({ where: { viewMeta: { id: metaId } } });
  }
        
  update(id:string, data:UpdateBiViewSettingDto) {
    return this.biViewSettingRepository.update(id, { config: data.config });
  }
}
