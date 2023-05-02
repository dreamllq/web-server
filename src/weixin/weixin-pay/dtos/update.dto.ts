import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WeixinPayUpdateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    mchid: string;
  @ApiProperty()
    partnerKey:string;
  @ApiPropertyOptional()
  @ApiProperty()
    pfx?: string;
  @ApiProperty()
    notifyUrl: string;
  @ApiProperty()
    spbillCreateIp:string;
}