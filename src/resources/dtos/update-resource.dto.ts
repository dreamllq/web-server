import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateResourceDto {
  @ApiProperty({ description: '资源名称' })
  @IsString()
  @IsNotEmpty()
    key: string;

  @ApiProperty({ description: '资源描述' })
  @IsString()
    desc: string;
}