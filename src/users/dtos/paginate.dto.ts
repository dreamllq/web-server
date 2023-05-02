import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UsersPaginateDto {

  @ApiProperty()
  @IsString()
    pageNo: number;

  @ApiProperty()
  @IsString()
    pageSize: number;

  @ApiPropertyOptional()
  @ApiProperty({ description: '用户名' })
  @IsOptional()
  @IsString()
    username: string;

  @ApiPropertyOptional()
  @ApiProperty({ description: '是否活跃' })
  @IsOptional()
  @IsString()
    isActive: string;
}