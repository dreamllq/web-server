import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateBiDataMetaDto {
  @ApiProperty()
    pageNo:number;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty()
    name: string;
}