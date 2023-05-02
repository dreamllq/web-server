import { ApiProperty } from '@nestjs/swagger';
import { WeixinPlatformUser } from '../weixin-platform-user.entity';

class WeixinPlatformUserPaginatePage {
  @ApiProperty()
    count: number;
  @ApiProperty({ type: [WeixinPlatformUser] })
    list: WeixinPlatformUser[];
}

export class WeixinPlatformUserPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: WeixinPlatformUserPaginatePage })
    data: WeixinPlatformUserPaginatePage;
}