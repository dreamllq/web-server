import { Module } from '@nestjs/common';
import { AiAliyunAccountModule } from './ai-aliyun-account/ai-aliyun-account.module';
import { AiAliyunOcrModule } from './ai-aliyun-ocr/ai-aliyun-ocr.module';

@Module({ imports: [AiAliyunAccountModule, AiAliyunOcrModule] })
export class AiAliyunModule {}
