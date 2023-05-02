import { ApiProperty } from '@nestjs/swagger';
import { MallGoodRelationTypeEnum } from '../mall-good-relation.type';

export class MallGoodRelationGetWidthFilter {
  @ApiProperty()
    userId: string;
  @ApiProperty()
    goodId: string;
  @ApiProperty({ type: MallGoodRelationTypeEnum })
    type: MallGoodRelationTypeEnum;
}