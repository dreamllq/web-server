import { Injectable } from '@nestjs/common';
import { CreateBiDataRuleDto } from './dto/create-bi-data-rule.dto';
import { UpdateBiDataRuleDto } from './dto/update-bi-data-rule.dto';

@Injectable()
export class BiDataRuleService {
  create(createBiDataRuleDto: CreateBiDataRuleDto) {
    return 'This action adds a new biDataRule';
  }

  findAll() {
    return `This action returns all biDataRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} biDataRule`;
  }

  update(id: number, updateBiDataRuleDto: UpdateBiDataRuleDto) {
    return `This action updates a #${id} biDataRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} biDataRule`;
  }
}
