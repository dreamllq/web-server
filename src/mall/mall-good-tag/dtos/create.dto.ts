import { ApiProperty } from '@nestjs/swagger';

export class MallGoodTagCreateDto {
  @ApiProperty()
    name: string;
  @ApiProperty()
    desc: string;
}