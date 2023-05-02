import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeixinController } from './weixin.controller';
import { Weixin } from './weixin.entity';
import { WeixinService } from './weixin.service';
import { WeixinOfficialAccountConfigController } from './weixin-official-account-config/weixin-official-account-config.controller';
import { WeixinOfficialAccountConfigService } from './weixin-official-account-config/weixin-official-account-config.service';
import { WeixinOfficialAccountConfig } from './weixin-official-account-config/weixin-official-account-config.entity';
import { WeixinPayController } from './weixin-pay/weixin-pay.controller';
import { WeixinPayService } from './weixin-pay/weixin-pay.service';
import { WeixinPay } from './weixin-pay/weixin-pay.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Weixin,
      WeixinOfficialAccountConfig,
      WeixinPay
    ])
  ],
  controllers: [
    WeixinController,
    WeixinOfficialAccountConfigController,
    WeixinPayController
  ],
  providers: [
    WeixinService,
    WeixinOfficialAccountConfigService,
    WeixinPayService
  ],
  exports: [
    WeixinService,
    WeixinOfficialAccountConfigService,
    WeixinPayService
  ]
})
export class WeixinModule {}
