import { ApiProperty } from '@nestjs/swagger';
import { BiDataMeta } from '../entities/bi-data-meta.entity';

export class BiDataMetaGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiDataMeta })
    data: BiDataMeta;
}