import { ApiProperty } from '@nestjs/swagger';

export class MallGoodCommentPaginateWidthCursorDto {
  @ApiProperty()
    count: number;
  @ApiProperty()
    afterId: string;
  @ApiProperty()
    goodId: string;
}