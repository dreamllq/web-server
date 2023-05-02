import { Injectable, Logger } from '@nestjs/common';
import { CustomCacheService } from 'src/custom-cache/custom-cache.service';
import { WeixinOfficialAccountConfigService } from 'src/weixin/weixin-official-account-config/weixin-official-account-config.service';
import { WeixinService } from 'src/weixin/weixin.service';
const OAuth = require('co-wechat-oauth');

@Injectable()
export class WeixinOfficialAccountOauthService {
  private readonly logger = new Logger('WeixinOfficialAccountOauthService');
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
    const client = new OAuth(
      weixin.appid, 
      weixin.appSecret, 
      (openid) => this.get(`weixin:${appid}:oauth_openid:${openid}:official_account:access_token`), 
      (openid, token) => this.set(`weixin:${appid}:oauth_openid:${openid}:official_account:access_token`, token, 60 * 60 * 2)
    );
    return client;
  }

  async snsUserInfoUrl(appid, redirectUrl) {
    const client = await this.getClientByAppid(appid);
    return client.getAuthorizeURL(redirectUrl, 'userinfo', 'snsapi_userinfo');
  }

  async snsUserBaseUrl(appid, redirectUrl) {
    const client = await this.getClientByAppid(appid);
    return client.getAuthorizeURL(redirectUrl, 'base', 'snsapi_base');
  }

  async getOpenidAndUnionidByCode(appid, code) {
    const client = await this.getClientByAppid(appid);
    const token = await client.getAccessToken(code);
    this.logger.log(`[getOpenidAndUnionidByCode] ${JSON.stringify(token)}`);
    const { unionid, openid } = token.data;
    return {
      unionid,
      openid 
    };
  }

  async getUserInfoByOpenId(appid, openid) {
    const client = await this.getClientByAppid(appid);
    return client.getUser(openid);
  }
}
