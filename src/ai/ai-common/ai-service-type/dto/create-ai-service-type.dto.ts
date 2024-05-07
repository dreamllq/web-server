import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAiServiceTypeDto {
  @ApiProperty({ description: '服务类型名称' })
  @IsNotEmpty()
  @IsString()
    name:string;
}
