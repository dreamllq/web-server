import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduSessionController } from './ai-baidu-session.controller';
import { AiBaiduSessionService } from './ai-baidu-session.service';

describe('AiBaiduSessionController', () => {
  let controller: AiBaiduSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiBaiduSessionController],
      providers: [AiBaiduSessionService],
    }).compile();

    controller = module.get<AiBaiduSessionController>(AiBaiduSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
