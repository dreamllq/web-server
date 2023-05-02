import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ForumPostRelationTypeEnum } from '../forum-post-relation.type';

export class ForumPostRelationGetAllDto {
  @ApiPropertyOptional()
  @ApiProperty({ enum: ForumPostRelationTypeEnum })
    type:ForumPostRelationTypeEnum;
  @ApiPropertyOptional()
  @ApiProperty()
    postId: string;
}