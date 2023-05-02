import { ApiProperty } from '@nestjs/swagger';

export class WeixinPayCreateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    mchid: string;
  @ApiProperty()
    partnerKey:string;
  @ApiProperty()
    pfx: string;
  @ApiProperty()
    notifyUrl: string;
  @ApiProperty()
    spbillCreateIp:string;
}