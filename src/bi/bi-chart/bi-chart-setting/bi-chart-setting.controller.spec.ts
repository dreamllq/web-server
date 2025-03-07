import { Test, TestingModule } from '@nestjs/testing';
import { BiChartSettingController } from './bi-chart-setting.controller';
import { BiChartSettingService } from './bi-chart-setting.service';

describe('BiChartSettingController', () => {
  let controller: BiChartSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiChartSettingController],
      providers: [BiChartSettingService],
    }).compile();

    controller = module.get<BiChartSettingController>(BiChartSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
