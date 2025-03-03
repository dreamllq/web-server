import { ApiProperty } from '@nestjs/swagger';
import { BiDataMeta } from '../entities/bi-data-meta.entity';

class BiDataMetaPaginatePage {
  @ApiProperty({ type: [BiDataMeta] })
    list:BiDataMeta[];
  @ApiProperty()
    count: number;
}

export class BiDataMetaPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiDataMetaPaginatePage })
    data: BiDataMetaPaginatePage;
}