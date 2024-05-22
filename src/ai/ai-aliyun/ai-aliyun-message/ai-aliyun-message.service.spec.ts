import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunMessageService } from './ai-aliyun-message.service';

describe('AiAliyunMessageService', () => {
  let service: AiAliyunMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAliyunMessageService],
    }).compile();

    service = module.get<AiAliyunMessageService>(AiAliyunMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
