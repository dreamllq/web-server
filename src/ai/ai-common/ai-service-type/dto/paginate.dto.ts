import { ApiProperty } from '@nestjs/swagger';

export class AiServiceTypePaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
}