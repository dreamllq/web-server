import { ApiProperty } from '@nestjs/swagger';
import { MallGoodTag } from '../mall-good-tag.entity';

class MallGoodTagPaginatePageInfo {
  @ApiProperty({ type: [MallGoodTag] })
    list: MallGoodTag[];
  @ApiProperty()
    count: number;
}

export class MallGoodTagPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallGoodTagPaginatePageInfo })
    data: MallGoodTagPaginatePageInfo;
}