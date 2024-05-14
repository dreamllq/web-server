import { Module } from '@nestjs/common';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';
import { AiAliyunOcrController } from './ai-aliyun-ocr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAliyunOcr } from './entities/ai-aliyun-ocr.entity';
import { AiAliyunOcrRecognizeAllText } from './entities/ai-aliyun-ocr-recognize-all-text.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiAliyunOcrRecognizeAllText, AiAliyunOcr])],
  controllers: [AiAliyunOcrController],
  providers: [AiAliyunOcrService]
})
export class AiAliyunOcrModule {}
