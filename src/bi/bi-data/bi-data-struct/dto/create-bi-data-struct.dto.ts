import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BiDataStructType } from '../constants/bi-data-struct-type';

export class CreateBiDataStructDto {
  @ApiProperty({
    enum: BiDataStructType,
    required: true,
    enumName: 'BiDataStructType'
  })
    type:BiDataStructType;

  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    group: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    desc: string;
}
