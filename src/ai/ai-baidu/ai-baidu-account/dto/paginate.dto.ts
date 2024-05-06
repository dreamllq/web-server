import { ApiProperty } from '@nestjs/swagger';

export class AiBaiduAccountPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}