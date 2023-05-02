import { ApiProperty } from '@nestjs/swagger';
import { WeixinPay } from '../weixin-pay.entity';

class WeixinPayPaginatePageInfo {
  @ApiProperty({ type: [WeixinPay] })
    list: WeixinPay[];
  @ApiProperty()
    count: number;
}

export class WeixinPayPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: WeixinPayPaginatePageInfo })
    data: WeixinPayPaginatePageInfo;
}