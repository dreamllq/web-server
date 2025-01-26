import { Module } from '@nestjs/common';
import { BiDataModule } from './bi-data/bi-data.module';
import { BiChartModule } from './bi-chart/bi-chart.module';
import { BiViewModule } from './bi-view/bi-view.module';

@Module({ imports: [BiDataModule, BiChartModule, BiViewModule] })
export class BiModule {}
