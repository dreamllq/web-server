import { ApiProperty } from '@nestjs/swagger';

export class MallShopUpdateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    desc: string;
  @ApiProperty()
    headimg: string;
}