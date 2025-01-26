import { Module } from '@nestjs/common';
import { BiChartMetaService } from './bi-chart-meta.service';
import { BiChartMetaController } from './bi-chart-meta.controller';

@Module({
  controllers: [BiChartMetaController],
  providers: [BiChartMetaService]
})
export class BiChartMetaModule {}
