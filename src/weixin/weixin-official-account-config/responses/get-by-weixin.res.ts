import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { WeixinOfficialAccountConfig } from '../weixin-official-account-config.entity';

export class WeixinOfficialAccountConfigGetByWeixinSuccessResponse extends SuccessResult<WeixinOfficialAccountConfig> {
  @ApiProperty({ type: WeixinOfficialAccountConfig })
    data:WeixinOfficialAccountConfig;
}