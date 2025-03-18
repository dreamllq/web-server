import { Test, TestingModule } from '@nestjs/testing';
import { BiViewSettingController } from './bi-view-setting.controller';
import { BiViewSettingService } from './bi-view-setting.service';

describe('BiViewSettingController', () => {
  let controller: BiViewSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiViewSettingController],
      providers: [BiViewSettingService],
    }).compile();

    controller = module.get<BiViewSettingController>(BiViewSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
