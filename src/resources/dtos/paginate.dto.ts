import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ResourcesPaginateDto {

  @ApiProperty()
  @IsString()
    pageNo: number;

  @ApiProperty()
  @IsString()
    pageSize: number;

  @ApiPropertyOptional()
  @ApiProperty({ description: '资源名' })
  @IsOptional()
  @IsString()
    name: string;
}