import { PartialType } from '@nestjs/swagger';
import { CreateBiDataRuleDto } from './create-bi-data-rule.dto';

export class UpdateBiDataRuleDto extends PartialType(CreateBiDataRuleDto) {}
