import { ApiProperty } from '@nestjs/swagger';
import { MallGoodComment } from '../mall-good-comment.entity';

class MallGoodCommentPaginateWidthCursorPageInfo {
  @ApiProperty({ type: [MallGoodComment] })
    list: MallGoodComment[];
  @ApiProperty()
    count: number;
}

export class MallGoodCommentPaginateWidthCursorResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallGoodCommentPaginateWidthCursorPageInfo })
    data: MallGoodCommentPaginateWidthCursorPageInfo;
}