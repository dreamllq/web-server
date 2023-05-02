import { ApiProperty } from '@nestjs/swagger';

export class MallShopCreateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    desc: string;
  @ApiProperty()
    headimg: string;
}