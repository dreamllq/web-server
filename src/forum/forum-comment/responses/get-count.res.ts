import { ApiProperty } from '@nestjs/swagger';

export class ForumCommentGetCountResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    data: number;
}