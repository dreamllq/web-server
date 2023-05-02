import { ApiProperty } from '@nestjs/swagger';
import { MallCart } from '../mall-cart.entity';

export class MallCartGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [MallCart] })
    data: MallCart[];
}