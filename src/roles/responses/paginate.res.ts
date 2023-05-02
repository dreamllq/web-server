import { ApiProperty } from '@nestjs/swagger';
import { PaginateResult, SuccessResult } from 'src/common-model';
import { Role } from '../role.entity';

class RolesPaginateResult extends PaginateResult<Role> {
  @ApiProperty({ type: [Role] })
    list: Role[];
}

export class RolesPaginateSuccessResponse extends SuccessResult<RolesPaginateResult> {
  @ApiProperty({ type: RolesPaginateResult })
    data:RolesPaginateResult;
}