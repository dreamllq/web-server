import { ApiProperty } from '@nestjs/swagger';
import { MallGoodComment } from '../mall-good-comment.entity';

class MallGoodCommentPaginatePageInfo {
  @ApiProperty({ type: [MallGoodComment] })
    list: MallGoodComment[];
  @ApiProperty()
    count: number;
}

export class MallGoodCommentPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallGoodCommentPaginatePageInfo })
    data: MallGoodCommentPaginatePageInfo;
}