import { Test, TestingModule } from '@nestjs/testing';
import { BiViewSettingService } from './bi-view-setting.service';

describe('BiViewSettingService', () => {
  let service: BiViewSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiViewSettingService],
    }).compile();

    service = module.get<BiViewSettingService>(BiViewSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
