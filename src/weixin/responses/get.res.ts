import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { Weixin } from '../weixin.entity';

export class WeixinGetSuccessResponse extends SuccessResult<Weixin> {
  @ApiProperty({ type: Weixin })
    data:Weixin;
}