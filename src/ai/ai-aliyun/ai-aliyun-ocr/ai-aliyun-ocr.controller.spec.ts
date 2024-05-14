import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunOcrController } from './ai-aliyun-ocr.controller';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';

describe('AiAliyunOcrController', () => {
  let controller: AiAliyunOcrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAliyunOcrController],
      providers: [AiAliyunOcrService],
    }).compile();

    controller = module.get<AiAliyunOcrController>(AiAliyunOcrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
