import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ForumCommentPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty()
    postId: string;

  @ApiPropertyOptional()
  @ApiProperty()
    content:string;
}