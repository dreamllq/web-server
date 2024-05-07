import { Module } from '@nestjs/common';
import { AiBaiduAccountModule } from './ai-baidu-account/ai-baidu-account.module';
import { AiBaiduServiceModule } from './ai-baidu-service/ai-baidu-service.module';

@Module({ imports: [AiBaiduAccountModule, AiBaiduServiceModule] })
export class AiBaiduModule {}
