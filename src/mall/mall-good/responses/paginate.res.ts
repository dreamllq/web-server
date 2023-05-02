import { ApiProperty } from '@nestjs/swagger';
import { MallGood } from '../mall-good.entity';

class MallGoodPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [MallGood] })
    list: MallGood[];
}

export class MallGoodPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallGoodPaginatePage })
    data: MallGoodPaginatePage;
}