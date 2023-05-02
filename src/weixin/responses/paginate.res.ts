import { ApiProperty } from '@nestjs/swagger';
import { PaginateResult, SuccessResult } from 'src/common-model';
import { Weixin } from '../weixin.entity';

class WeixinPaginateResult extends PaginateResult<Weixin> {
  @ApiProperty({ type: [Weixin] })
    list: Weixin[];
}

export class WeixinPaginateSuccessResponse extends SuccessResult<WeixinPaginateResult> {
  @ApiProperty({ type: WeixinPaginateResult })
    data:WeixinPaginateResult;
}