import { ApiProperty } from '@nestjs/swagger';

export class AiBaiduOcrPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}