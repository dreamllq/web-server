import { ApiProperty } from '@nestjs/swagger';

export class ForumPostUpdateDto {
  @ApiProperty()
    title: string;
  @ApiProperty()
    content: string;
  @ApiProperty({ type: [String] })
    images: string[];
}