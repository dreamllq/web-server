import { Injectable, Logger } from '@nestjs/common';
import { CustomCacheService } from 'src/custom-cache/custom-cache.service';
import { SmsAliCloudService } from './sms.alicloud.service';
import { SettingService } from 'src/setting/setting.service';
import { SmsTypeEnum } from './types';

enum SmsPlatformEnum {
  AliCloud = 'aliyun'
}

@Injectable()
export class SmsService {
  constructor(
    private readonly settingService: SettingService,
    private readonly cacheService: CustomCacheService,
    private readonly smsAliCloudService: SmsAliCloudService
  ) {}

  async sendCode(phone, code) {
    const items = await this.settingService.getItems(['SMS_PLATFORM']);

    const smsPlatform = items[0]?.value;

    if (smsPlatform === SmsPlatformEnum.AliCloud) {
      return this.smsAliCloudService.sendCode(phone, code);
    }
  }

  async sendValidCode(phone, type) {
    const codeArray = [
      0,
      0,
      0,
      0,
      0,
      0
    ]; 

    codeArray.forEach((item, index) => {
      codeArray[index] = Math.floor(9999888 * Math.random()) % 10;
    });
    const code = codeArray.join('');
    await this.sendCode(phone, code);
    await this.cacheService.set(`sms:${phone}:${type}`, code, 5 * 60);
  }

  async checkValidCode(phone, type: SmsTypeEnum, code) {
    const cacheCode = await this.cacheService.get(`sms:${phone}:${type}`);
    const check = cacheCode === code;
    if (check === true) {
      await this.cacheService.del(`sms:${phone}:${type}`);
    } 
    return check;
  }
}
