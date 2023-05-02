import { ApiProperty } from '@nestjs/swagger';
import { MallGoodTag } from '../mall-good-tag.entity';

export class MallGoodTabGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [MallGoodTag] })
    data: MallGoodTag[];
}