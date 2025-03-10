import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBiViewMetaDto {
  @ApiProperty()
  @IsString()
    name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
    desc: string;
}
