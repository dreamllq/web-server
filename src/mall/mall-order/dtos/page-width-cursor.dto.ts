import { ApiProperty } from '@nestjs/swagger';

export class MallOrderPageWidthCursorDto {
  @ApiProperty()
    count: number;
  @ApiProperty()
    afterId: string;
}