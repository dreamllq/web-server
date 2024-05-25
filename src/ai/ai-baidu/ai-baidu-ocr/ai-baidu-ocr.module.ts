import { Module } from '@nestjs/common';
import { AiBaiduOcrService } from './ai-baidu-ocr.service';
import { AiBaiduOcrController } from './ai-baidu-ocr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiBaiduOrcGeneralScenarios } from './entities/ai-baidu-orc-general-scenarios.entity';
import { AiBaiduOcr } from './entities/ai-baidu-ocr.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AiBaiduOrcGeneralScenarios, AiBaiduOcr])],
  controllers: [AiBaiduOcrController],
  providers: [AiBaiduOcrService]
})
export class AiBaiduOcrModule {}
