import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBiChartSettingDto {

  @ApiProperty()
  @IsString()
    config: string;
}
