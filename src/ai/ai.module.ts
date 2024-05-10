import { Module } from '@nestjs/common';
import { AiBaiduModule } from './ai-baidu/ai-baidu.module';
import { AiCommonModule } from './ai-common/ai-common.module';
import { AiAliyunModule } from './ai-aliyun/ai-aliyun.module';

@Module({ imports: [AiBaiduModule, AiCommonModule, AiAliyunModule] })
export class AiModule {}
