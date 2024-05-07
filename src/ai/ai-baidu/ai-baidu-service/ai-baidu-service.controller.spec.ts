import { Test, TestingModule } from '@nestjs/testing';
import { AiBaiduServiceController } from './ai-baidu-service.controller';
import { AiBaiduServiceService } from './ai-baidu-service.service';

describe('AiBaiduServiceController', () => {
  let controller: AiBaiduServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiBaiduServiceController],
      providers: [AiBaiduServiceService]
    }).compile();

    controller = module.get<AiBaiduServiceController>(AiBaiduServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
