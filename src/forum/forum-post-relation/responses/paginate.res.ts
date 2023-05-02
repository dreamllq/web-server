import { ApiProperty } from '@nestjs/swagger';
import { ForumPostRelation } from '../forum-post-relation.entity';

class ForumPostRelationPaginatePage {
  @ApiProperty({ type: [ForumPostRelation] })
    list: ForumPostRelation[];
  @ApiProperty()
    count: number;
}

export class ForumPostRelationPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumPostRelationPaginatePage })
    data: ForumPostRelationPaginatePage;
}