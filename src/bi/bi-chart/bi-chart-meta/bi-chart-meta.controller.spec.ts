import { Test, TestingModule } from '@nestjs/testing';
import { BiChartMetaController } from './bi-chart-meta.controller';
import { BiChartMetaService } from './bi-chart-meta.service';

describe('BiChartMetaController', () => {
  let controller: BiChartMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiChartMetaController],
      providers: [BiChartMetaService],
    }).compile();

    controller = module.get<BiChartMetaController>(BiChartMetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
