import { Module } from '@nestjs/common';
import { BiChartSettingService } from './bi-chart-setting.service';
import { BiChartSettingController } from './bi-chart-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiChartSetting } from './entities/bi-chart-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiChartSetting])],
  controllers: [BiChartSettingController],
  providers: [BiChartSettingService]
})
export class BiChartSettingModule {}
