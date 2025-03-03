import { ApiProperty } from '@nestjs/swagger';
import { BiDataRule } from '../entities/bi-data-rule.entity';

export class BiDataRuleGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiDataRule })
    data: BiDataRule;
}