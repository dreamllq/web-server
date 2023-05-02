import { ApiProperty } from '@nestjs/swagger';

export class UsersBindMobileDto {
  @ApiProperty()
    mobile: string;
    
  @ApiProperty()
    code: string;
}