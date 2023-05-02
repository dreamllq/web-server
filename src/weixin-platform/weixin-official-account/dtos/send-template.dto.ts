import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendTemplateDto {

  @ApiProperty()
  @IsString()
    templateId: string;

  @ApiProperty()
  @IsString()
    openId: string;

  @ApiProperty()
    data:any;
}