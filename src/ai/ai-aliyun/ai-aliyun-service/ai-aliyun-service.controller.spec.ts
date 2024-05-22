import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunServiceController } from './ai-aliyun-service.controller';
import { AiAliyunServiceService } from './ai-aliyun-service.service';

describe('AiAliyunServiceController', () => {
  let controller: AiAliyunServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAliyunServiceController],
      providers: [AiAliyunServiceService]
    }).compile();

    controller = module.get<AiAliyunServiceController>(AiAliyunServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
