import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunMessageController } from './ai-aliyun-message.controller';
import { AiAliyunMessageService } from './ai-aliyun-message.service';

describe('AiAliyunMessageController', () => {
  let controller: AiAliyunMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAliyunMessageController],
      providers: [AiAliyunMessageService]
    }).compile();

    controller = module.get<AiAliyunMessageController>(AiAliyunMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
