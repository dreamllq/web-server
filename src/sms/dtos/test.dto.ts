import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SmsTestDto {
  @ApiProperty()
  @IsString()
    phone: string;

  @ApiProperty()
  @IsString()
    code: string;
}