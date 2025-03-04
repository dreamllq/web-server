import { ApiProperty } from '@nestjs/swagger';
import { BiChartMeta } from '../entities/bi-chart-meta.entity';

export class BiChartMetaGetAllResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [BiChartMeta] })
    data: BiChartMeta[];
}