import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunAccountController } from './ai-aliyun-account.controller';
import { AiAliyunAccountService } from './ai-aliyun-account.service';

describe('AiAliyunAccountController', () => {
  let controller: AiAliyunAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAliyunAccountController],
      providers: [AiAliyunAccountService],
    }).compile();

    controller = module.get<AiAliyunAccountController>(AiAliyunAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
