import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunServiceService } from './ai-aliyun-service.service';

describe('AiAliyunServiceService', () => {
  let service: AiAliyunServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [AiAliyunServiceService] }).compile();

    service = module.get<AiAliyunServiceService>(AiAliyunServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
