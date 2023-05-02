import { ApiProperty } from '@nestjs/swagger';

export class ForumPostGetCountResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    data: number;
}