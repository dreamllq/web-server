import { ApiProperty } from '@nestjs/swagger';

export class AiAliyunAccountPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}