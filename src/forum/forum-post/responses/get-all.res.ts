import { ApiProperty } from '@nestjs/swagger';
import { ForumPost } from '../forum-post.entity';

export class ForumPostGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumPost })
    data: ForumPost[];
}