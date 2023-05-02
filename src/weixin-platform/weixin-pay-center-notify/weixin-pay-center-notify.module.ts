import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WeixinPayCenterNotifyController } from './weixin-pay-center-notify.controller';
import { WeixinPayCenterNotifyService } from './weixin-pay-center-notify.service';
import { WxNativePayNotifyMiddleware } from './native-pay-notify.middleware';
import { WxPayNotifyMiddleware } from './pay-notify.middleware';
import { WxRefundNotifyMiddleware } from './refund-notify.middleware';
import { WeixinModule } from 'src/weixin/weixin.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [WeixinModule, FileModule],
  controllers: [WeixinPayCenterNotifyController],
  providers: [WeixinPayCenterNotifyService]
})
export class WeixinPayCenterNotifyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WxNativePayNotifyMiddleware)
      .forRoutes('nativePay');
    consumer
      .apply(WxPayNotifyMiddleware)
      .forRoutes('commonPay');
    consumer
      .apply(WxRefundNotifyMiddleware)
      .forRoutes('refund');
  }
}