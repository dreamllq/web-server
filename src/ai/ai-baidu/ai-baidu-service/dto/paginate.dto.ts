import { ApiProperty } from '@nestjs/swagger';

export class AiBaiduServicePaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}