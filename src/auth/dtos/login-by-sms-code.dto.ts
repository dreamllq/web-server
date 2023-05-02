import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBySmsCodeDto {

  @ApiProperty({ description: '手机号' })
  @IsString()
  @IsNotEmpty()
    mobile: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  @IsNotEmpty()
    code: string;
}