import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAiBaiduSessionDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiProperty({ description: '账号' })
  @IsNotEmpty()
  @IsString()
    accountId:string;

  @ApiProperty({ description: '服务' })
  @IsNotEmpty()
  @IsString()
    serviceId:string;
}
