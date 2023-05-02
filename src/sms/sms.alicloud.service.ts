import { Injectable, Logger } from '@nestjs/common';
// This file is auto-generated, don't edit it
import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import { SettingService } from 'src/setting/setting.service';
// import * as $tea from '@alicloud/tea-typescript';

@Injectable()
export class SmsAliCloudService {
  private readonly logger = new Logger('SmsService');

  constructor(
    private readonly settingService: SettingService,
  ) {}

  async getConfig() {
    const items = await this.settingService.getItems([
      'ALIYUN_SMS_ACCESS_KEY_ID',
      'ALIYUN_SMS_ACCESS_KEY_SECRET',
      'ALIYUN_SMS_SIGN_NAME',
      'ALIYUN_SMS_TEMPLATE_ID'
    ]);

    return {
      accessKeyId: items[0]?.value,
      accessKeySecret: items[1]?.value,
      signName: items[2]?.value,
      templateId: items[3]?.value
    };
  }

  createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi20170525 {
    const config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: accessKeySecret
    });
    // 访问的域名
    config.endpoint = 'dysmsapi.aliyuncs.com';
    return new Dysmsapi20170525(config);
  }

  async sendCode(phone, code) {
    const config = await this.getConfig();
    // 工程代码泄露可能会导致AccessKey泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    const client = this.createClient(config.accessKeyId, config.accessKeySecret);
    this.logger.log(`[sendCode] {"code":${Number(code)}}`);
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: config.signName,
      templateCode: config.templateId,
      phoneNumbers: phone,
      templateParam: `{"code":${Number(code)}}`
    });
    const runtime = new $Util.RuntimeOptions({ });
    try {
      return await client.sendSmsWithOptions(sendSmsRequest, runtime);
    } catch (error) {
      this.logger.error(error.message);
    }    
  }
}
