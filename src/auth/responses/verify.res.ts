import { ApiProperty } from '@nestjs/swagger';

export class AuthVerifyResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    data: boolean;
}