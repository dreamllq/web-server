import { ApiProperty } from '@nestjs/swagger';

export class UsersBindUsernameDto {
  @ApiProperty()
    username: string;
  @ApiProperty()
    password: string;
}