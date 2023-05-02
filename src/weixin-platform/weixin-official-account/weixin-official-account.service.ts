import { Injectable, Logger } from '@nestjs/common';
import { CustomCacheService } from 'src/custom-cache/custom-cache.service';
import { WeixinOfficialAccountConfigService } from 'src/weixin/weixin-official-account-config/weixin-official-account-config.service';
import { WeixinService } from 'src/weixin/weixin.service';
const WechatAPI = require('co-wechat-api');

@Injectable()
export class WeixinOfficialAccountService {
  private readonly logger = new Logger('WeixinOfficialAccountService');
  constructor(
    private readonly weixinService: WeixinService,
    private readonly weixinOfficialAccountConfigService: WeixinOfficialAccountConfigService,
    private readonly cacheService: CustomCacheService
  ) {}

  async set(key, value, ttl?: number) {
    return await this.cacheService.set(key, JSON.stringify(value), ttl);
  }

  async get(key) {
    const value = await this.cacheService.get(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return undefined;
    }
  }

  async getClientByAppid(appid) {
    const weixin = await this.weixinService.findByAppid(appid);
    const client = new WechatAPI(
      weixin.appid,
      weixin.appSecret, 
      () => this.get(`weixin:${appid}:official_account:access_token`), 
      (token) => this.set(`weixin:${appid}:official_account:access_token`, token, 60 * 60 * 2)
    );
    return client;
  }

  async getAccessToken(appid) {
    const client = await this.getClientByAppid(appid);
    return client.ensureAccessToken();
  }

  async getJssdkSignature(appid, { debug, url, jsApiList }) {
    const client = await this.getClientByAppid(appid);
    return client.getJsConfig({
      debug,
      url,
      jsApiList 
    });
  }

  async getAllPrivateTemplate(appid) {
    const client = await this.getClientByAppid(appid);
    return client.getAllPrivateTemplate();
  }

  async delPrivateTemplate(appid, templateId) {
    const client = await this.getClientByAppid(appid);
    return client.delPrivateTemplate(templateId);
  }

  async sendTemplate(appid, sendTemplateDto) {
    const client = await this.getClientByAppid(appid);
    return client.sendTemplate(sendTemplateDto.openId, sendTemplateDto.templateId, '', undefined, sendTemplateDto.data);
  }
}
