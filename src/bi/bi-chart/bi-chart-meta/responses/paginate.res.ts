import { ApiProperty } from '@nestjs/swagger';
import { BiChartMeta } from '../entities/bi-chart-meta.entity';

class BiChartMetaPaginatePage {
  @ApiProperty({ type: [BiChartMeta] })
    list:BiChartMeta[];
  @ApiProperty()
    count: number;
}

export class BiChartMetaPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: BiChartMetaPaginatePage })
    data: BiChartMetaPaginatePage;
}