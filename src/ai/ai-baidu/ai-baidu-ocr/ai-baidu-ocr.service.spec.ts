import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduOcrService } from './ai-baidu-ocr.service';

describe('AiBaiduOcrService', () => {
  let service: AiBaiduOcrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [AiBaiduOcrService] }).compile();

    service = module.get<AiBaiduOcrService>(AiBaiduOcrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
