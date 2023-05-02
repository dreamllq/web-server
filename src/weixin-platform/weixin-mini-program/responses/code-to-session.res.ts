import { ApiProperty } from '@nestjs/swagger';

class SessionInfo {
  @ApiProperty()
    openid: string;
  @ApiProperty()
    unionid: string;
  @ApiProperty()
    session_key: string;
}

export class WeixinMiniProgramCodeToSessionResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: SessionInfo })
    data: SessionInfo;
}