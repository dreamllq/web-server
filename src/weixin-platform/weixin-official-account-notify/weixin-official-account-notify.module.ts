import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WeixinOfficialAccountNotifyService } from './weixin-official-account-notify.service';
import { WeixinOfficialAccountNotifyController } from './weixin-official-account-notify.controller';
import { WeixinModule } from 'src/weixin/weixin.module';
import { CustomCacheModule } from 'src/custom-cache/custom-cache.module';
import { WeixinOfficialAccountModule } from '../weixin-official-account/weixin-official-account.module';
import { WeixinOfficialAccountNotifyMiddleware } from './weixin-official-account-notify.middleware';

@Module({
  imports: [
    WeixinModule,
    CustomCacheModule,
    WeixinOfficialAccountModule
  ],
  controllers: [WeixinOfficialAccountNotifyController],
  providers: [WeixinOfficialAccountNotifyService]
})
export class WeixinOfficialAccountNotifyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WeixinOfficialAccountNotifyMiddleware)
      .forRoutes(WeixinOfficialAccountNotifyController);
  }
}
