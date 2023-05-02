import { Injectable, Logger } from '@nestjs/common';
import { CustomCacheService } from 'src/custom-cache/custom-cache.service';
import { WeixinOfficialAccountConfigService } from 'src/weixin/weixin-official-account-config/weixin-official-account-config.service';
import { WeixinService } from 'src/weixin/weixin.service';
const WechatAPI = require('co-wechat-api');
import { postJSON, handleRes } from './util';
const CryptoJS = require('crypto-js');

@Injectable()
export class WeixinMiniProgramService {
  private readonly logger = new Logger('WeixinMiniProgramService');
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
      () => this.get(`weixin:${appid}:mp:access_token`), 
      (token) => this.set(`weixin:${appid}:mp:access_token`, token, 60 * 60 * 2)
    );
    return client;
  }

  async code2Session(appid, code): Promise<{openid: string, unionid: string, session_key: string}> {
    const client = await this.getClientByAppid(appid);
    const res = await client.code2Session(code);
    this.logger.log(`[code2Session] ${JSON.stringify(res)}`);
    return res;
  }

  async getAccessToken(appid) {
    const client = await this.getClientByAppid(appid);
    return client.ensureAccessToken();
  }

  async getPhoneNumber(appid, code) : Promise<{phoneNumber:string}> {
    const client = await this.getClientByAppid(appid);
    const { accessToken } = await client.ensureAccessToken();
    const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`;
    const res = await client.request(url, postJSON({ code }));
    handleRes(res);
    return res.phone_info;
  }

  async getUserEncryptKey(appid, openid, sessionKey) {
    const client = await this.getClientByAppid(appid);
    const { accessToken } = await client.ensureAccessToken();
    const url = `https://api.weixin.qq.com/wxa/business/getuserencryptkey?access_token=${accessToken}`;
    const opts = { 
      openid: openid,
      signature: CryptoJS.HmacSHA256('', sessionKey).toString(), 
      sig_method: 'hmac_sha256'
    };
    this.logger.log(`[getUserEncryptKey] sessionKey: ${sessionKey}`);
    this.logger.log(`[getUserEncryptKey] ${JSON.stringify(opts)}`);
    const res = await client.request(url, postJSON(opts));
    handleRes(res);
    return res.key_info_list;
  }

  /**
   * 该接口用于获取小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制，详见获取小程序码。
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/qr-code.html
   */
  async getQRCode(appid, path, {
    width = 430,
    auto_color = false,
    line_color = {
      'r': 0,
      'g': 0,
      'b': 0 
    },
    is_hyaline = false
  }) {
    const client = await this.getClientByAppid(appid);
    const { accessToken } = await client.ensureAccessToken();
    const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${accessToken}`;
    const opts = {
      path,
      width,
      auto_color,
      line_color,
      is_hyaline
    };
    const res = await client.request(url, postJSON(opts));
    handleRes(res);
    return {
      'contentType': res.contentType,
      'buffer': res.buffer
    };
  }
}
