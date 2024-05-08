import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';
import { InitializationModule } from './initialization/initialization.module';
import { ResourcesModule } from './resources/resources.module';
import { RolesModule } from './roles/roles.module';
import { SessionModule } from './session/session.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SmsModule } from './sms/sms.module';
import { SettingModule } from './setting/setting.module';
import { CustomCacheModule } from './custom-cache/custom-cache.module';
import { WeixinModule } from './weixin/weixin.module';
import { WeixinOfficialAccountModule } from './weixin-platform/weixin-official-account/weixin-official-account.module';
import { WeixinOfficialAccountOauthModule } from './weixin-platform/weixin-official-account-oauth/weixin-official-account-oauth.module';
import { WeixinMiniProgramModule } from './weixin-platform/weixin-mini-program/weixin-mini-program.module';
import { AddressModule } from './address/address.module';
import { AreaModule } from './area/area.module';
import { ForumModule } from './forum/forum.module';
import { MallModule } from './mall/mall.module';
import { WeixinOfficialAccountNotifyModule } from './weixin-platform/weixin-official-account-notify/weixin-official-account-notify.module';
import { WeixinPlatformUserModule } from './weixin-platform/weixin-platform-user/weixin-platform-user.module';
import { ChatModule } from './chat/chat.module';
import { WeixinPayCenterNotifyModule } from './weixin-platform/weixin-pay-center-notify/weixin-pay-center-notify.module';
import { WeixinPayCenterModule } from './weixin-platform/weixin-pay-center/weixin-pay-center.module';
import { WsMessageChannelModule } from './message-channel/ws-message-channel/ws-message-channel.module';
import { BullModule } from '@nestjs/bull';
import { SmsMessageChannelModule } from './message-channel/sms-message-channel/sms-message-channel.module';
import { WxMessageChannelModule } from './message-channel/wx-message-channel/wx-message-channel.module';
import { WsMessageChannelQueueModule } from './message-channel/ws-message-channel-queue/ws-message-channel-queue.module';
import { WsMessageModule } from './ws/ws-message/ws-message.module';
import { SmsMessageChannelQueueModule } from './message-channel/sms-message-channel-queue/sms-message-channel-queue.module';
import { WxMessageChannelQueueModule } from './message-channel/wx-message-channel-queue/wx-message-channel-queue.module';
import { DepartmentModule } from './department/department.module';
import { LogModule } from './log/log.module';
import { AiModule } from './ai/ai.module';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        autoLoadEntities: true,
        entities: [__dirname + '/../dist/**/*.entity.{ts,js}'],
        synchronize: process.env.DB_SYNCHRONIZE === '1',
        logging: ['error', 'warn'],
        maxQueryExecutionTime: 1000,
        logger: 'simple-console'
        // type: 'sqljs',
        // autoSave: true,
        // location: resolve('sqljs/a') 
      })
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        db: Number(process.env.REDIS_DB)
      }
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    FileModule,
    InitializationModule,
    ResourcesModule,
    RolesModule,
    SessionModule,
    SmsModule,
    SettingModule,
    CustomCacheModule,
    WeixinModule,
    WeixinOfficialAccountModule,
    WeixinOfficialAccountOauthModule,
    WeixinMiniProgramModule,
    WeixinPlatformUserModule,
    WeixinOfficialAccountNotifyModule,
    WeixinPayCenterNotifyModule,
    WeixinPayCenterModule,
    AddressModule,
    AreaModule,
    ForumModule,
    MallModule,
    ChatModule,
    WsMessageModule,
    WsMessageChannelModule,
    WsMessageChannelQueueModule,
    SmsMessageChannelModule,
    SmsMessageChannelQueueModule,
    WxMessageChannelModule,
    WxMessageChannelQueueModule,
    DepartmentModule,
    LogModule,
    AiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
