import { Test, TestingModule } from '@nestjs/testing';
import { BiDataRuleService } from './bi-data-rule.service';

describe('BiDataRuleService', () => {
  let service: BiDataRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiDataRuleService],
    }).compile();

    service = module.get<BiDataRuleService>(BiDataRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
