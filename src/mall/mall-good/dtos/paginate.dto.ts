import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MallGoodPaginateDto {
  @ApiProperty()
    pageNo: number;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty()
    shopId: string;
  @ApiPropertyOptional()
  @ApiProperty()
    title: string;
}