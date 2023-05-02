import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginByWeixinDto {
  @ApiProperty()
  @IsString()
    appid: string;
    
  @ApiProperty()
  @IsString()
    code: string;
}