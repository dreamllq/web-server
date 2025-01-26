import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { ChartModule } from './chart/chart.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [DataModule, ChartModule, ViewModule]
})
export class BiModule {}
