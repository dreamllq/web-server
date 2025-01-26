import { Test, TestingModule } from '@nestjs/testing';
import { BiChartMetaService } from './bi-chart-meta.service';

describe('BiChartMetaService', () => {
  let service: BiChartMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiChartMetaService],
    }).compile();

    service = module.get<BiChartMetaService>(BiChartMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
