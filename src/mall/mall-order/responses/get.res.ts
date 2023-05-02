import { ApiProperty } from '@nestjs/swagger';
import { MallOrder } from '../mall-order.entity';

export class MallOrderGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallOrder })
    data: MallOrder;
}