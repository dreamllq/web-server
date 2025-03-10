import { ApiProperty } from '@nestjs/swagger';
import { BiViewMeta } from '../entities/bi-view-meta.entity';


class BiViewMetaPaginatePage {
  @ApiProperty({ type: [BiViewMeta] })
    list:BiViewMeta[];
  @ApiProperty()
    count: number;
}

export class BiViewMetaPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiViewMetaPaginatePage })
    data: BiViewMetaPaginatePage;
}