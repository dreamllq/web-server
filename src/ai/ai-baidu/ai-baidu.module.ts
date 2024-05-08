import { Module } from '@nestjs/common';
import { AiBaiduAccountModule } from './ai-baidu-account/ai-baidu-account.module';
import { AiBaiduServiceModule } from './ai-baidu-service/ai-baidu-service.module';
import { AiBaiduSessionModule } from './ai-baidu-session/ai-baidu-session.module';
import { AiBaiduMessageModule } from './ai-baidu-message/ai-baidu-message.module';

@Module({
  imports: [
    AiBaiduAccountModule,
    AiBaiduServiceModule,
    AiBaiduSessionModule,
    AiBaiduMessageModule
  ] 
})
export class AiBaiduModule {}
