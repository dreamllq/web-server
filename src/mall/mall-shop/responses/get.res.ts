import { ApiProperty } from '@nestjs/swagger';
import { MallShop } from '../mall-shop.entity';

export class MallShopGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallShop })
    data: MallShop;
}