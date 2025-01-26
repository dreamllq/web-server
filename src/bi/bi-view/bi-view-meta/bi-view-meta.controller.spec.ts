import { Test, TestingModule } from '@nestjs/testing';
import { BiViewMetaController } from './bi-view-meta.controller';
import { BiViewMetaService } from './bi-view-meta.service';

describe('BiViewMetaController', () => {
  let controller: BiViewMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiViewMetaController],
      providers: [BiViewMetaService],
    }).compile();

    controller = module.get<BiViewMetaController>(BiViewMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
