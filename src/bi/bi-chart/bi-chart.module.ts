import { Module } from '@nestjs/common';
import { BiChartMetaModule } from './bi-chart-meta/bi-chart-meta.module';
import { BiChartSettingModule } from './bi-chart-setting/bi-chart-setting.module';

@Module({
  imports: [BiChartMetaModule, BiChartSettingModule]
})
export class BiChartModule {}
