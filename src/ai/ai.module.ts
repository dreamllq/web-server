import { Module } from '@nestjs/common';
import { AiBaiduModule } from './ai-baidu/ai-baidu.module';
import { AiCommonModule } from './ai-common/ai-common.module';

@Module({ imports: [AiBaiduModule, AiCommonModule] })
export class AiModule {}
