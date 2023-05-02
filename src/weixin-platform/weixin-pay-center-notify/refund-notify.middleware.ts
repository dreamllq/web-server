import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FileService } from 'src/file/file.service';
import { WeixinPayService } from 'src/weixin/weixin-pay/weixin-pay.service';
const tenpay = require('tenpay');

@Injectable()
export class WxRefundNotifyMiddleware implements NestMiddleware {
  constructor(
    private readonly weixinPayService:WeixinPayService,
    private readonly fileService:FileService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const appid = req.params.appid;
    const mchid = req.params.mchid;
    const weixinPay = await this.weixinPayService.findOneByMchid(mchid);
    const file = await this.fileService.findOne(weixinPay.pfx);

    const config = {
      appid: appid,
      mchid: mchid,
      partnerKey: weixinPay.partnerKey,
      pfx: file.content,
      notify_url: weixinPay.notifyUrl,
      spbill_create_ip: weixinPay.spbillCreateIp
    };
    const api = new tenpay(config);

    api.middlewareForExpress('refund')(req, res, next);
  }
}
