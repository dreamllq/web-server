import { ApiProperty } from '@nestjs/swagger';
import { MallGoodRelationTypeEnum } from '../mall-good-relation.type';

export class MallGoodRelationCreateDto {
  @ApiProperty()
    goodId: string;
  @ApiProperty({ enum: MallGoodRelationTypeEnum })
    type: MallGoodRelationTypeEnum;
}