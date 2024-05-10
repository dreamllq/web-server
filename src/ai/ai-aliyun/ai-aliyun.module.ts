import { Module } from '@nestjs/common';
import { AiAliyunAccountModule } from './ai-aliyun-account/ai-aliyun-account.module';

@Module({
  imports: [AiAliyunAccountModule]
})
export class AiAliyunModule {}
