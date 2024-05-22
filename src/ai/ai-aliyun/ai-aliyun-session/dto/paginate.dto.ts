import { ApiProperty } from '@nestjs/swagger';

export class AiAliyunSessionPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}