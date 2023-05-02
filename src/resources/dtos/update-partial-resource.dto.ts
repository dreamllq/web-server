import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePartialResourceDto {
  @ApiPropertyOptional()
  @ApiProperty({ description: '资源名称' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
    key?: string;

  @ApiPropertyOptional()
  @ApiProperty({ description: '资源描述' })
  @IsOptional()
  @IsString()
    desc?: string;
}