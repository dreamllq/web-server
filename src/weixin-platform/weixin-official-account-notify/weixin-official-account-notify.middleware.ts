import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WeixinOfficialAccountConfigService } from 'src/weixin/weixin-official-account-config/weixin-official-account-config.service';
import { WeixinService } from 'src/weixin/weixin.service';
const wechat = require('wechat');

@Injectable()
export class WeixinOfficialAccountNotifyMiddleware implements NestMiddleware {
  constructor(
    private readonly weixinOfficialAccountConfigService: WeixinOfficialAccountConfigService,
    private readonly weixinService : WeixinService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const appid = req.params.appid;
    const weixin = await this.weixinService.findByAppid(appid);
    const weixinOfficialAccountConfig = await this.weixinOfficialAccountConfigService.getByWeixinId(weixin.id);
    wechat({
      token: weixinOfficialAccountConfig.token,
      appid: weixin.appid,
      encodingAESKey: weixinOfficialAccountConfig.encodingAesKey,
      checkSignature: weixinOfficialAccountConfig.checkSignature // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
    }, async (req, res, next) => {
      next();
    })(req, res, next);
  }
}
