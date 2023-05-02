import { ApiProperty } from '@nestjs/swagger';
import { ForumPost } from '../forum-post.entity';

class ForumPostPaginatePage {
  @ApiProperty({ type: [ForumPost] })
    list: ForumPost[];
  @ApiProperty()
    count:number;
}

export class ForumPostPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumPostPaginatePage })
    data: ForumPostPaginatePage;
}