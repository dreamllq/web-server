import { ApiProperty } from '@nestjs/swagger';
import { PaginateResult, SuccessResult } from 'src/common-model';
import { User } from '../user.entity';

class UsersPaginateResult extends PaginateResult<User> {
  @ApiProperty({ type: [User] })
    list: User[];
}

export class UsersPaginateSuccessResponse extends SuccessResult<UsersPaginateResult> {
  @ApiProperty({ type: UsersPaginateResult })
    data:UsersPaginateResult;
}