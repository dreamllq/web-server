import { Module } from '@nestjs/common';
import { BiChartMetaModule } from './bi-chart-meta/bi-chart-meta.module';

@Module({
  imports: [BiChartMetaModule]
})
export class BiChartModule {}
