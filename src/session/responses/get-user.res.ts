import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class SessionGetUserResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: User })
    data: User;
}