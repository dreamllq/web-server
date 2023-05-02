import { ApiProperty } from '@nestjs/swagger';
import { ForumPostRelation } from '../forum-post-relation.entity';

export class ForumPostRelationGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [ForumPostRelation] })
    data: ForumPostRelation[];
}