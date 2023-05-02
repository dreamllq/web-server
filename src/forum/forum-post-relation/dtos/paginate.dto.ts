import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ForumPostRelationTypeEnum } from '../forum-post-relation.type';

export class ForumPostRelationPaginateDto {
  @ApiProperty()
    pageNo:number;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty({ enum: ForumPostRelationTypeEnum })
    type:ForumPostRelationTypeEnum;
  @ApiPropertyOptional()
  @ApiProperty()
    postId: string;
}