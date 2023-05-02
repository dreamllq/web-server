import { ApiProperty } from '@nestjs/swagger';
import { WeixinPay } from '../weixin-pay.entity';

export class WeixinPayGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: WeixinPay })
    data: WeixinPay;
}