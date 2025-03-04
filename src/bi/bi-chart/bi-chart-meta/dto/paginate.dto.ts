import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateBiChartMetaDto {
  @ApiProperty()
    pageNo:number;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty()
    name: string;
}