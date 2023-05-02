import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';


export class SettingGetDto {
  @ApiProperty({ type: [String] })
  @IsArray()
    keys: string[];
}