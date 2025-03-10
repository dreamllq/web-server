import { ApiProperty } from '@nestjs/swagger';
import { BiViewMeta } from '../entities/bi-view-meta.entity';

export class BiViewMetaGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [BiViewMeta] })
    data: BiViewMeta[];
}