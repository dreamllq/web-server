import { Injectable, Logger } from '@nestjs/common';
import { EventTypeEventEnum, MsgTypeEnum, SubscribeNotify, UnsubscribeNotify } from './weixin-official-account-notify.type';
import { WeixinService } from 'src/weixin/weixin.service';
import { WeixinOfficialAccountConfigService } from 'src/weixin/weixin-official-account-config/weixin-official-account-config.service';
import { WeixinOfficialAccountService } from '../weixin-official-account/weixin-official-account.service';
const wechat = require('wechat');

@Injectable()
export class WeixinOfficialAccountNotifyService {
  private readonly logger = new Logger('WechatNotifyService');

  constructor(
    private readonly weixinOfficialAccountService: WeixinOfficialAccountService,
    // private readonly wechatUserService: WechatUserService,
    private readonly weixinOfficialAccountConfigService: WeixinOfficialAccountConfigService,
    private readonly weixinService : WeixinService
  ) {}

  async notifyHandle(appid, req, res) {
    const weixin = await this.weixinService.findByAppid(appid);
    const weixinOfficialAccountConfig = await this.weixinOfficialAccountConfigService.getByWeixinId(weixin.id);
    return new Promise(resolve => {
      wechat({
        token: weixinOfficialAccountConfig.token,
        appid: weixin.appid,
        encodingAESKey: weixinOfficialAccountConfig.encodingAesKey,
        checkSignature: weixinOfficialAccountConfig.checkSignature // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
      }, async (req, res) => {
        this.logger.log(`notifyHandle weixin data: ${JSON.stringify(req.weixin)}`);
        const msgType:MsgTypeEnum = req.weixin.MsgType;
        if (msgType === MsgTypeEnum.Event) {
          const result = await this.eventMessageHandle(appid, req.weixin);
          res.reply(result);
        } else {
          res.reply('aa');
        }
        resolve(null);
      })(req, res);
    });
  }

  private textMessageHandle(appid, data) {}

  private imageMessageHandle(appid, data) {}

  private voiceMessageHandle(appid, data) {}

  private videoMessageHandle(appid, data) {}

  private shortVideoMessageHandle(appid, data) {}

  private locationMessageHandle(appid, data) {}

  private linkMessageHandle(appid, data) {}

  private async eventMessageHandle(appid, data: SubscribeNotify | UnsubscribeNotify) {
    const event = data.Event;
    if (event === EventTypeEventEnum.Subscribe) {
      return await this.eventSubscribeMessageHandle(appid, data);
    } else if (event === EventTypeEventEnum.Unsubscribe) {
      return await this.eventUnsubscribeMessageHandle(appid, data);
    }
  }

  private async eventSubscribeMessageHandle(appid, data: SubscribeNotify) {
    const client = await this.weixinOfficialAccountService.getClientByAppid(appid);
    const userInfo = await client.getUser(data.FromUserName);
    this.logger.log(`eventSubscribeMessageHandle user data: ${JSON.stringify(userInfo)}`);
    // await this.wechatUserService.create(userInfo);
    return 'hello';
  }

  private async eventUnsubscribeMessageHandle(appid, data: UnsubscribeNotify) {
    // await this.wechatUserService.removeByOpenid(data.FromUserName);
  }

  private eventScanMessageHandle(data) {}

  private eventLocationMessageHandle(data) {}

  private eventClickMessageHandle(data) {}

  private eventHandleMessageHandle(data) {}
}
