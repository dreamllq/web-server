import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ForumPostGetCountDto {
  @ApiPropertyOptional()
  @ApiProperty()
    sectionId: string;
}