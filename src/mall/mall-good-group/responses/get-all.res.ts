import { ApiProperty } from '@nestjs/swagger';
import { MallGoodGroup } from '../mall-good-group.entity';

export class MallGoodGroupGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [MallGoodGroup] })
    data: MallGoodGroup[];
}