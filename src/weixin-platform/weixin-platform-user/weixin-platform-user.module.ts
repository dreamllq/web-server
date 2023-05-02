import { Module } from '@nestjs/common';
import { WeixinPlatformUserService } from './weixin-platform-user.service';
import { WeixinPlatformUser } from './weixin-platform-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeixinModule } from 'src/weixin/weixin.module';
import { WeixinOfficialAccountOauthModule } from 'src/weixin-platform/weixin-official-account-oauth/weixin-official-account-oauth.module';
import { WeixinMiniProgramModule } from 'src/weixin-platform/weixin-mini-program/weixin-mini-program.module';
import { WeixinPlatformUserController } from './weixin-platform-user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeixinPlatformUser]),
    WeixinModule,
    WeixinOfficialAccountOauthModule,
    WeixinMiniProgramModule
  ],
  providers: [WeixinPlatformUserService],
  exports: [WeixinPlatformUserService],
  controllers: [WeixinPlatformUserController]
})
export class WeixinPlatformUserModule {}
