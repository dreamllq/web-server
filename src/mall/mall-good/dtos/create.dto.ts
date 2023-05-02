import { ApiProperty } from '@nestjs/swagger';

export class MallGoodCreateDto {
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
  @ApiProperty()
    shopId: string;
}