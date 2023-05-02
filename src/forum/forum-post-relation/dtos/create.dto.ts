import { ApiProperty } from '@nestjs/swagger';
import { ForumPostRelationTypeEnum } from '../forum-post-relation.type';

export class ForumPostRelationCreateDto {
  @ApiProperty({ enum: ForumPostRelationTypeEnum })
    type: ForumPostRelationTypeEnum;
  @ApiProperty()
    postId: string;
}