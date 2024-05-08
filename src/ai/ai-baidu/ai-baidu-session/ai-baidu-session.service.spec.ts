import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduSessionService } from './ai-baidu-session.service';

describe('AiBaiduSessionService', () => {
  let service: AiBaiduSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [AiBaiduSessionService] }).compile();

    service = module.get<AiBaiduSessionService>(AiBaiduSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
