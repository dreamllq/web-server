import { Test, TestingModule } from '@nestjs/testing';
import { BiDataMetaController } from './bi-data-meta.controller';
import { BiDataMetaService } from './bi-data-meta.service';

describe('BiDataMetaController', () => {
  let controller: BiDataMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiDataMetaController],
      providers: [BiDataMetaService],
    }).compile();

    controller = module.get<BiDataMetaController>(BiDataMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
