import { ApiProperty } from '@nestjs/swagger';

export class MallGoodTagPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}