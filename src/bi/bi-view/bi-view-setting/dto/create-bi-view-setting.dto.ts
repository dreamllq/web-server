import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBiViewSettingDto {
  @ApiProperty()
  @IsString()
    config: string;
}
