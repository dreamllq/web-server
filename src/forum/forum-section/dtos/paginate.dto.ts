import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ForumSectionPaginateDto {
  @ApiProperty()
    pageNo:number;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty()
    name: string;
}