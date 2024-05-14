import { Module } from '@nestjs/common';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';
import { AiAliyunOcrController } from './ai-aliyun-ocr.controller';

@Module({
  controllers: [AiAliyunOcrController],
  providers: [AiAliyunOcrService]
})
export class AiAliyunOcrModule {}
