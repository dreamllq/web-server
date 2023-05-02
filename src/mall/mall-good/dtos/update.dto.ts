import { ApiProperty } from '@nestjs/swagger';

export class MallGoodUpdateDto {
  @ApiProperty()
    title: string;
  @ApiProperty()
    desc: string;
  @ApiProperty()
    groupId: string;
  @ApiProperty()
    headimg: string;
  @ApiProperty()
    price: number;
  @ApiProperty({ type: [String] })
    images: string[];
  @ApiProperty()
    detail: string;
}