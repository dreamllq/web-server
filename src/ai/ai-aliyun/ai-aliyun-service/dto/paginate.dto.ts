import { ApiProperty } from '@nestjs/swagger';

export class AiAliyunServicePaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}