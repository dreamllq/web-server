import { Module } from '@nestjs/common';
import { BiViewSettingService } from './bi-view-setting.service';
import { BiViewSettingController } from './bi-view-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiViewSetting } from './entities/bi-view-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiViewSetting])],
  controllers: [BiViewSettingController],
  providers: [BiViewSettingService]
})
export class BiViewSettingModule {}
