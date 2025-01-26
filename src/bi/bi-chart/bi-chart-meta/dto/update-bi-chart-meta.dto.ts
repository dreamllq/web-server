import { PartialType } from '@nestjs/swagger';
import { CreateBiChartMetaDto } from './create-bi-chart-meta.dto';

export class UpdateBiChartMetaDto extends PartialType(CreateBiChartMetaDto) {}
