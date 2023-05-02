import { ApiProperty } from '@nestjs/swagger';
import { MallGoodGroup } from '../mall-good-group.entity';

export class MallGoodGroupGetTreeResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: [MallGoodGroup] })
    data: MallGoodGroup[];
}