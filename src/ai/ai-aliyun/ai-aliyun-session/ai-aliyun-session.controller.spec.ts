import { Test, TestingModule } from '@nestjs/testing';
import { AiAliyunSessionController } from './ai-aliyun-session.controller';
import { AiAliyunSessionService } from './ai-aliyun-session.service';

describe('AiAliyunSessionController', () => {
  let controller: AiAliyunSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAliyunSessionController],
      providers: [AiAliyunSessionService],
    }).compile();

    controller = module.get<AiAliyunSessionController>(AiAliyunSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
