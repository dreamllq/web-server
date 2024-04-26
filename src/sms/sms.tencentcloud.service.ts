import { Injectable, Logger } from '@nestjs/common';
import { SettingService } from 'src/setting/setting.service';

// sdk 文档地址：https://cloud.tencent.com/document/product/382/43197

@Injectable()
export class SmsAliCloudService {
  private readonly logger = new Logger('SmsService');

  constructor(
    private readonly settingService: SettingService,
  ) {}

  async getConfig() {
    const items = await this.settingService.getItems([]);

    return {};
  }

  async sendCode(phone, code) {}
}