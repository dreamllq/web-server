import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduOcrController } from './ai-baidu-ocr.controller';
import { AiBaiduOcrService } from './ai-baidu-ocr.service';

describe('AiBaiduOcrController', () => {
  let controller: AiBaiduOcrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiBaiduOcrController],
      providers: [AiBaiduOcrService]
    }).compile();

    controller = module.get<AiBaiduOcrController>(AiBaiduOcrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
