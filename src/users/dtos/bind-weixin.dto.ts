import { ApiProperty } from '@nestjs/swagger';

export class UsersBindWeixinDto {
  @ApiProperty()
    appid: string;
  @ApiProperty()
    code: string;
}