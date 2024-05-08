import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduMessageService } from './ai-baidu-message.service';

describe('AiBaiduMessageService', () => {
  let service: AiBaiduMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiBaiduMessageService],
    }).compile();

    service = module.get<AiBaiduMessageService>(AiBaiduMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
