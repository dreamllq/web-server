import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { WeixinAppTypeEnum } from '../weixin.type';

export class WeixinCreateDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    name:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    appid:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    appSecret: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    appType: WeixinAppTypeEnum;
}