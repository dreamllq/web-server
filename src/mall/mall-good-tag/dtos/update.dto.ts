import { ApiProperty } from '@nestjs/swagger';

export class MallGoodTagUpdateDto {
  @ApiProperty()
    desc: string;
}