import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduServiceService } from './ai-baidu-service.service';

describe('AiBaiduServiceService', () => {
  let service: AiBaiduServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [AiBaiduServiceService] }).compile();

    service = module.get<AiBaiduServiceService>(AiBaiduServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
