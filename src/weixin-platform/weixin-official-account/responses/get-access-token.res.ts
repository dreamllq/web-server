import { ApiProperty } from '@nestjs/swagger';

class AccessToken {
  @ApiProperty()
    accessToken: string;
  @ApiProperty()
    expireTime: number;
}

export class WeixinOfficialAccountGetAccessTokenResponse {
  @ApiProperty()
    code: number;
    
  @ApiProperty({ type: AccessToken })
    data:AccessToken;
}