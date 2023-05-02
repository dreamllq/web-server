import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ForumCommentCreateDto {
  @ApiProperty()
    content: string;
  @ApiProperty()
    postId: string;
  @ApiProperty({ type: [String] })
    images: string[];
  @ApiPropertyOptional()
  @ApiProperty()
    toCommentId?: string;
}