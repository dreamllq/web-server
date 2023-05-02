import { ApiProperty } from '@nestjs/swagger';
import { MallGood } from '../mall-good.entity';

export class MallGoodGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallGood })
    data: MallGood;
}