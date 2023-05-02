import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MallGoodGroupCreateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    headimg: string;
  @ApiPropertyOptional()
  @ApiProperty()
    parentId?: string;
}