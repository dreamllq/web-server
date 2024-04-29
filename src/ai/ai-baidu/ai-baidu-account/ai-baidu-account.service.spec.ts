import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduAccountService } from './ai-baidu-account.service';

describe('AiBaiduAccountService', () => {
  let service: AiBaiduAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [AiBaiduAccountService] }).compile();

    service = module.get<AiBaiduAccountService>(AiBaiduAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
