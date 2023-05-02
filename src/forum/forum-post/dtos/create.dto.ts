import { ApiProperty } from '@nestjs/swagger';

export class ForumPostCreateDto {
  @ApiProperty()
    title: string;
  @ApiProperty()
    content: string;
  @ApiProperty({ type: [String] })
    images: string[];
  @ApiProperty()
    sectionId: string;
}