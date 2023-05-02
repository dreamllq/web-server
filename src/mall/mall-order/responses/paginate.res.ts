import { ApiProperty } from '@nestjs/swagger';
import { MallOrder } from '../mall-order.entity';

class MallOrderPaginatePageInfo {
  @ApiProperty({ type: [MallOrder] })
    list: MallOrder[];
  @ApiProperty()
    count: number;
}

export class MallOrderPaginateResponse {
  @ApiProperty()
    code:number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallOrderPaginatePageInfo })
    data: MallOrderPaginatePageInfo;
}