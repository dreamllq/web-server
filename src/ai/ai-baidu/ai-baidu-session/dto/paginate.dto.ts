import { ApiProperty } from '@nestjs/swagger';

export class AiBaiduSessionPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}