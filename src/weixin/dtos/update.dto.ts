import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { WeixinAppTypeEnum } from '../weixin.type';

export class WeixinUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    appSecret: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    appType: WeixinAppTypeEnum;
}