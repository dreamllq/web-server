import { CreateBiDataRuleDto } from './dto/create-bi-data-rule.dto';
import { UpdateBiDataRuleDto } from './dto/update-bi-data-rule.dto';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BiDataRule } from './entities/bi-data-rule.entity';
@Injectable()
export class BiDataRuleService {
  constructor(
        @InjectRepository(BiDataRule)
        private biDataRuleRepository: Repository<BiDataRule>,
  ) {}
  create(metaId: string, data:CreateBiDataRuleDto) {
    return this.biDataRuleRepository.insert({
      type: data.type,
      excelFile: data.excelFile,
      sql: data.sql,
      meta: { id: metaId }
    });
  }
    
  findOne(metaId: string) {
    return this.biDataRuleRepository.findOne({ where: { meta: { id: metaId } } });
  }
    
  update(id:string, data:UpdateBiDataRuleDto) {
    return this.biDataRuleRepository.update(id, {
      type: data.type,
      excelFile: data.excelFile,
      sql: data.sql
    });
  }
}
