import { Test, TestingModule } from '@nestjs/testing';
import { BiViewMetaService } from './bi-view-meta.service';

describe('BiViewMetaService', () => {
  let service: BiViewMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiViewMetaService],
    }).compile();

    service = module.get<BiViewMetaService>(BiViewMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
