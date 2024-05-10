import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunAccountService } from './ai-aliyun-account.service';

describe('AiAliyunAccountService', () => {
  let service: AiAliyunAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAliyunAccountService],
    }).compile();

    service = module.get<AiAliyunAccountService>(AiAliyunAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
