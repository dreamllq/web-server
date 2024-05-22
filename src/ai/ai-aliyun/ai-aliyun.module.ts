import { Module } from '@nestjs/common';
import { AiAliyunAccountModule } from './ai-aliyun-account/ai-aliyun-account.module';
import { AiAliyunOcrModule } from './ai-aliyun-ocr/ai-aliyun-ocr.module';
import { AiAliyunServiceModule } from './ai-aliyun-service/ai-aliyun-service.module';

@Module({
  imports: [
    AiAliyunAccountModule,
    AiAliyunOcrModule,
    AiAliyunServiceModule
  ] 
})
export class AiAliyunModule {}
