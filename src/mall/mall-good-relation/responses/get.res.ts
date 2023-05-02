import { ApiProperty } from '@nestjs/swagger';
import { MallGoodRelation } from '../mall-good-relation.entity';

export class MallGoodRelationGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty()
    message: string;
  @ApiProperty({ type: MallGoodRelation })
    data: MallGoodRelation;
}