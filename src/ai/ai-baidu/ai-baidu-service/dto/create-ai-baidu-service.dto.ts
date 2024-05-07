import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAiBaiduServiceDto {
  @ApiProperty({ description: '服务名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiProperty({ description: '接口path' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    path:string;

  @ApiProperty({ description: '服务类型' })
  @IsNotEmpty()
  @IsString()
    typeId:string;
}
