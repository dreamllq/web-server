import { ApiProperty } from '@nestjs/swagger';

export class MallOrderPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}