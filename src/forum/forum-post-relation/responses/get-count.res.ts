import { ApiProperty } from '@nestjs/swagger';

export class ForumPostRelationGetCountResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    data: number;
}