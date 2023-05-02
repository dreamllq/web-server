import { ApiProperty } from '@nestjs/swagger';

export class WeixinOfficialAccountGetNotifyUrlResponse {
  @ApiProperty()
    code: number;
    
  @ApiProperty()
    data: string;
}