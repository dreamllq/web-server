import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MallCartBatchUpdateDto {
  @ApiProperty({ type: [String] })
    ids:string[];
  @ApiPropertyOptional()
  @ApiProperty()
    checked?: boolean;
}