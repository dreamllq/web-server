import { ApiProperty } from '@nestjs/swagger';
import { ForumComment } from '../forum-comment.entity';

export class ForumCommentGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [ForumComment] })
    data: ForumComment[];
}