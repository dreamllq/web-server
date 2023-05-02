import { ApiProperty } from '@nestjs/swagger';

export class WeixinPayPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}