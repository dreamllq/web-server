import { Test, TestingModule } from '@nestjs/testing';
import { AiServiceTypeController } from './ai-service-type.controller';
import { AiServiceTypeService } from './ai-service-type.service';

describe('AiServiceTypeController', () => {
  let controller: AiServiceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiServiceTypeController],
      providers: [AiServiceTypeService]
    }).compile();

    controller = module.get<AiServiceTypeController>(AiServiceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
