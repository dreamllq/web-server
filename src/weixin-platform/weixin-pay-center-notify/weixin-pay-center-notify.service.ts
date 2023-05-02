import { Injectable } from '@nestjs/common';

@Injectable()
export class WeixinPayCenterNotifyService {}


// const tenpay = require('tenpay');

// const config = {
//   appid: '公众号ID',
//   mchid: '微信商户号',
//   partnerKey: '微信支付安全密钥',
//   pfx: require('fs').readFileSync('证书文件路径'),
//   notify_url: '支付回调网址',
//   spbill_create_ip: 'IP地址'
// };
// // 方式一
// const api = new tenpay(config);
