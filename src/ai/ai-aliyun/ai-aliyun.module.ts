import { Module } from '@nestjs/common';
import { AiAliyunAccountModule } from './ai-aliyun-account/ai-aliyun-account.module';
import { AiAliyunOcrModule } from './ai-aliyun-ocr/ai-aliyun-ocr.module';
import { AiAliyunServiceModule } from './ai-aliyun-service/ai-aliyun-service.module';
import { AiAliyunSessionModule } from './ai-aliyun-session/ai-aliyun-session.module';
import { AiAliyunMessageModule } from './ai-aliyun-message/ai-aliyun-message.module';

@Module({
  imports: [
    AiAliyunAccountModule,
    AiAliyunOcrModule,
    AiAliyunServiceModule,
    AiAliyunSessionModule,
    AiAliyunMessageModule
  ] 
})
export class AiAliyunModule {}
