import { Controller, Logger, Post, Req } from '@nestjs/common';

@Controller('weixin-platform/pay-center/notify')
export class WeixinPayCenterNotifyController {
  private readonly logger = new Logger('WeixinPayCenterNotifyController');

  @Post('commonPay/:appid/:mchid')
  commonPay(@Req() req) {
    this.logger.log(`[commonPay] weixin data: ${JSON.stringify(req.weixin)}`);
  }

  @Post('nativePay/:appid/:mchid')
  nativePay(@Req() req) {
    this.logger.log(`[nativePay] weixin data: ${JSON.stringify(req.weixin)}`);

  }

  @Post('refund/:appid/:mchid')
  refund(@Req() req) {
    this.logger.log(`[refund] weixin data: ${JSON.stringify(req.weixin)}`);
  }
}
