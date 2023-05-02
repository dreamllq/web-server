import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MallCartUpdateDto {
  @ApiPropertyOptional()
  @ApiProperty()
    count?: number;
    
  @ApiPropertyOptional()
  @ApiProperty()
    checked?: boolean;
}