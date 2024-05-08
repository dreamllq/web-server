import { Module } from '@nestjs/common';
import { AiBaiduAccountModule } from './ai-baidu-account/ai-baidu-account.module';
import { AiBaiduServiceModule } from './ai-baidu-service/ai-baidu-service.module';
import { AiBaiduSessionModule } from './ai-baidu-session/ai-baidu-session.module';

@Module({
  imports: [
    AiBaiduAccountModule,
    AiBaiduServiceModule,
    AiBaiduSessionModule
  ] 
})
export class AiBaiduModule {}
