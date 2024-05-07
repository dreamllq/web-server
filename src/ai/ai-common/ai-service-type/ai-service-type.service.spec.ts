import { Test, TestingModule } from '@nestjs/testing';
import { AiServiceTypeService } from './ai-service-type.service';

describe('AiServiceTypeService', () => {
  let service: AiServiceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [AiServiceTypeService] }).compile();

    service = module.get<AiServiceTypeService>(AiServiceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
