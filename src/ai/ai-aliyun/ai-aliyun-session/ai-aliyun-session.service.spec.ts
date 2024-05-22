import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunSessionService } from './ai-aliyun-session.service';

describe('AiAliyunSessionService', () => {
  let service: AiAliyunSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAliyunSessionService],
    }).compile();

    service = module.get<AiAliyunSessionService>(AiAliyunSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
