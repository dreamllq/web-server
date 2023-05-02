import { ApiProperty } from '@nestjs/swagger';

export class MallGoodCommentCreateDto {
  @ApiProperty()
    goodId: string;
  @ApiProperty()
    content: string;
  @ApiProperty({ type: [String] })
    images: string[];
}