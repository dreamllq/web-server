import { ApiProperty } from '@nestjs/swagger';
import { MallShop } from '../mall-shop.entity';


class MallShopPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [MallShop] })
    list: MallShop[];
}

export class MallShopPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallShopPaginatePage })
    data:MallShopPaginatePage;
}