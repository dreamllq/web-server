import { ApiProperty } from '@nestjs/swagger';

export class AiAliyunOcrPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}