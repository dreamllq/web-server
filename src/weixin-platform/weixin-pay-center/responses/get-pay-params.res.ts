import { ApiProperty } from '@nestjs/swagger';

class WeixinPayCenterGetPayParamsResult {
  @ApiProperty()
    appid: string;
  @ApiProperty()
    time_stamp: string;
  @ApiProperty()
    nonce_str: string;
  @ApiProperty()
    package: string;
  @ApiProperty()
    sign_type: string;
}

export class WeixinPayCenterGetPayParamsResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: WeixinPayCenterGetPayParamsResult })
    data: WeixinPayCenterGetPayParamsResult;
}