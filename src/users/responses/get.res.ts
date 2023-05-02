import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { User } from '../user.entity';

export class UserGetSuccessResponse extends SuccessResult<User> {
  @ApiProperty({ type: User })
    data:User;
}