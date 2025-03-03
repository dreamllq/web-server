import { Test, TestingModule } from '@nestjs/testing';
import { BiDataRuleController } from './bi-data-rule.controller';
import { BiDataRuleService } from './bi-data-rule.service';

describe('BiDataRuleController', () => {
  let controller: BiDataRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiDataRuleController],
      providers: [BiDataRuleService],
    }).compile();

    controller = module.get<BiDataRuleController>(BiDataRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
