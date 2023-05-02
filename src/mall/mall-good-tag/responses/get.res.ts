import { ApiProperty } from '@nestjs/swagger';
import { MallGoodTag } from '../mall-good-tag.entity';

export class MallGoodTagGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty()
    data: MallGoodTag;
}