import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class WeixinPaginateDto {
  @ApiProperty()
  @IsString()
    pageNo: number;

  @ApiProperty()
  @IsString()
    pageSize: number;

  @ApiPropertyOptional()
  @ApiProperty({ description: '应用名称' })
  @IsOptional()
  @IsString()
    name: string;
}