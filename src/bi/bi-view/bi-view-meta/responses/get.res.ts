import { ApiProperty } from '@nestjs/swagger';
import { BiViewMeta } from '../entities/bi-view-meta.entity';

export class BiViewMetaGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiViewMeta })
    data: BiViewMeta;
}