import { Module } from '@nestjs/common';
import { BiChartMetaService } from './bi-chart-meta.service';
import { BiChartMetaController } from './bi-chart-meta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiChartMeta } from './entities/bi-chart-meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiChartMeta])],
  controllers: [BiChartMetaController],
  providers: [BiChartMetaService]
})
export class BiChartMetaModule {}
