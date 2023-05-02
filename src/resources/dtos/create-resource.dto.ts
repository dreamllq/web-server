import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @ApiProperty({ description: '资源名称' })
  @IsString()
  @IsNotEmpty()
    name: string;

  @ApiProperty({ description: '资源key' })
  @IsString()
  @IsNotEmpty()
    key: string;

  @ApiPropertyOptional()
  @ApiProperty({ description: '资源描述' })
  @IsOptional()
  @IsString()
    desc: string;
}