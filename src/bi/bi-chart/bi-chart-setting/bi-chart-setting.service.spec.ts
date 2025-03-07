import { Test, TestingModule } from '@nestjs/testing';
import { BiChartSettingService } from './bi-chart-setting.service';

describe('BiChartSettingService', () => {
  let service: BiChartSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiChartSettingService],
    }).compile();

    service = module.get<BiChartSettingService>(BiChartSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
