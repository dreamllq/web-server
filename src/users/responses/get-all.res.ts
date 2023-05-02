import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { User } from '../user.entity';

export class UserGetAllSuccessResponse extends SuccessResult<User[]> {
  @ApiProperty({ type: [User] })
    data:User[];
}