import { Module } from '@nestjs/common';
import { CustomCacheModule } from 'src/custom-cache/custom-cache.module';
import { SettingModule } from 'src/setting/setting.module';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { SmsAliCloudService } from './sms.alicloud.service';

@Module({
  imports: [SettingModule, CustomCacheModule],
  controllers: [SmsController],
  providers: [SmsService, SmsAliCloudService],
  exports: [SmsService]
})
export class SmsModule {}
