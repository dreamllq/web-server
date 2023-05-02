import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RolePaginateDto {

  @ApiProperty()
  @IsString()
    pageNo: number;

  @ApiProperty()
  @IsString()
    pageSize: number;

  @ApiPropertyOptional()
  @ApiProperty({ description: '角色名' })
  @IsOptional()
  @IsString()
    name: string;
}