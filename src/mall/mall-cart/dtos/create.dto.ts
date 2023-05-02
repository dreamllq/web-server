import { ApiProperty } from '@nestjs/swagger';

export class MallCartCreateDto {
  @ApiProperty()
    goodId: string;
  @ApiProperty()
    count: number;
}