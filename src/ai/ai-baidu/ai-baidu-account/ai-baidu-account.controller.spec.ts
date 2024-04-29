import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduAccountController } from './ai-baidu-account.controller';
import { AiBaiduAccountService } from './ai-baidu-account.service';

describe('AiBaiduAccountController', () => {
  let controller: AiBaiduAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiBaiduAccountController],
      providers: [AiBaiduAccountService]
    }).compile();

    controller = module.get<AiBaiduAccountController>(AiBaiduAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
