import { ApiProperty } from '@nestjs/swagger';
import { ForumComment } from '../forum-comment.entity';

export class ForumCommentGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumComment })
    data: ForumComment;
}