import { ApiProperty } from '@nestjs/swagger';
import { ForumComment } from '../forum-comment.entity';

class ForumCommentPaginatePage {
  @ApiProperty({ type: [ForumComment] })
    list: ForumComment[];
  @ApiProperty()
    count: number;
}

export class ForumCommentPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumCommentPaginatePage })
    data: ForumCommentPaginatePage;
}