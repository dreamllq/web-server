import { ApiProperty } from '@nestjs/swagger';
import { Weixin } from '../weixin.entity';

export class WeixinGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [Weixin] })
    data: Weixin[];
}