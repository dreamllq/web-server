import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class WeixinOfficialAccountConfigUpdateDto {
  @ApiProperty()
  @IsString()
    token: string;

  @ApiProperty()
  @IsString()
    encodingAesKey: string;
    
  @ApiProperty()
  @IsBoolean()
    checkSignature: boolean;
}