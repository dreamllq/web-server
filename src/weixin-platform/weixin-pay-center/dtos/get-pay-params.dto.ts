import { ApiProperty } from '@nestjs/swagger';

export class WeixinPayCenterGetPayParamsDto {
  @ApiProperty()
    out_trade_no: string;
  @ApiProperty()
    body:string; 
  @ApiProperty()
    total_fee:number; 
  @ApiProperty()
    openid: string;
}