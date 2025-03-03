import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BiDataRuleType } from '../constants/bi-data-rule-type';

class File {
  @ApiProperty()
  @IsOptional()
  @IsString()
    id: string;
}

export class CreateBiDataRuleDto {
  @ApiProperty({
    enum: BiDataRuleType,
    required: true,
    enumName: 'BiDataRuleType'
  })
    type:BiDataRuleType;

  @ApiProperty()
  @IsOptional()
  @IsString()
    excelFile: File;

  @ApiProperty()
  @IsOptional()
  @IsString()
    sql: string;
}
