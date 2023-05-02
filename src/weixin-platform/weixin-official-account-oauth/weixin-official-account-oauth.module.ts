import { Module } from '@nestjs/common';
import { CustomCacheModule } from 'src/custom-cache/custom-cache.module';
import { WeixinModule } from 'src/weixin/weixin.module';
import { WeixinOfficialAccountOauthController } from './weixin-official-account-oauth.controller';
import { WeixinOfficialAccountOauthService } from './weixin-official-account-oauth.service';

@Module({
  imports: [WeixinModule, CustomCacheModule],
  controllers: [WeixinOfficialAccountOauthController],
  providers: [WeixinOfficialAccountOauthService],
  exports: [WeixinOfficialAccountOauthService]
})
export class WeixinOfficialAccountOauthModule {}
