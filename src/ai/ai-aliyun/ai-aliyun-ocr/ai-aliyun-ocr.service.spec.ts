import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';

describe('AiAliyunOcrService', () => {
  let service: AiAliyunOcrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAliyunOcrService],
    }).compile();

    service = module.get<AiAliyunOcrService>(AiAliyunOcrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
