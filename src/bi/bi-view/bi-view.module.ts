import { Module } from '@nestjs/common';
import { BiViewMetaModule } from './bi-view-meta/bi-view-meta.module';
import { BiViewSettingModule } from './bi-view-setting/bi-view-setting.module';

@Module({
  imports: [BiViewMetaModule, BiViewSettingModule]
})
export class BiViewModule {}
