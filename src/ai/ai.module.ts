import { Module } from '@nestjs/common';
import { AiBaiduModule } from './ai-baidu/ai-baidu.module';

@Module({ imports: [AiBaiduModule] })
export class AiModule {}
