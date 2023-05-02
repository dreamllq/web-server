import { ApiProperty } from '@nestjs/swagger';

export class MallGoodCommentPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
  @ApiProperty()
    goodId: string;
}