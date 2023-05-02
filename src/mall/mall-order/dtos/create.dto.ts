import { ApiProperty } from '@nestjs/swagger';

class GoodInfo {
  @ApiProperty()
    goodId: string;
  @ApiProperty()
    count: number;
}

export class MallOrderCreateDto {
  @ApiProperty()
    addressId: string;
  @ApiProperty({ type: [GoodInfo] })
    goods: GoodInfo[];
}