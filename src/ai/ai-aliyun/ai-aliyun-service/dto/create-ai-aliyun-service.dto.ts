import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAiAliyunServiceDto {
  @ApiProperty({ description: '服务名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiProperty({ description: '接口endpoint' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    endpoint:string;

  @ApiProperty({ description: '接口path' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    path:string;

  @ApiProperty({ description: 'model' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    model:string;

  @ApiProperty({ description: '服务类型' })
  @IsNotEmpty()
  @IsString()
    typeId:string;
}
