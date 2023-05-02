import { ApiProperty } from '@nestjs/swagger';

export class MallGoodGroupUpdateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    headimg: string;
}