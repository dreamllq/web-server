import { ApiProperty } from '@nestjs/swagger';
import { SuccessResult } from 'src/common-model';
import { Role } from '../role.entity';

export class RoleGetAllSuccessResponse extends SuccessResult<Role[]> {
  @ApiProperty({ type: [Role] })
    data:Role[];
}