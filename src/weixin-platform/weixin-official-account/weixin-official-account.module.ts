import { Module } from '@nestjs/common';
import { WeixinOfficialAccountController } from './weixin-official-account.controller';
import { WeixinOfficialAccountService } from './weixin-official-account.service';
import { WeixinModule } from 'src/weixin/weixin.module';
import { CustomCacheModule } from 'src/custom-cache/custom-cache.module';

@Module({
  imports: [WeixinModule, CustomCacheModule],
  controllers: [WeixinOfficialAccountController],
  providers: [WeixinOfficialAccountService],
  exports: [WeixinOfficialAccountService]
})
export class WeixinOfficialAccountModule {}
