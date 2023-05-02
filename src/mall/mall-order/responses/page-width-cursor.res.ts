import { ApiProperty } from '@nestjs/swagger';
import { MallOrder } from '../mall-order.entity';

class MallOrderPageWidthCursorPageInfo {
  @ApiProperty({ type: [MallOrder] })
    list: MallOrder[];
  @ApiProperty()
    count: number;
}

export class MallOrderPageWidthCursorResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallOrderPageWidthCursorPageInfo })
    data: MallOrderPageWidthCursorPageInfo;
}