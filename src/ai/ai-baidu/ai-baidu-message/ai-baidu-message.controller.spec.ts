import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduMessageController } from './ai-baidu-message.controller';
import { AiBaiduMessageService } from './ai-baidu-message.service';

describe('AiBaiduMessageController', () => {
  let controller: AiBaiduMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiBaiduMessageController],
      providers: [AiBaiduMessageService]
    }).compile();

    controller = module.get<AiBaiduMessageController>(AiBaiduMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
