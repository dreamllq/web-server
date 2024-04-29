import { Module } from '@nestjs/common';
import { AiBaiduAccountModule } from './ai-baidu-account/ai-baidu-account.module';

@Module({ imports: [AiBaiduAccountModule] })
export class AiBaiduModule {}
