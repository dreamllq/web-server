import { Test, TestingModule } from '@nestjs/testing';
import { BiDataMetaService } from './bi-data-meta.service';

describe('BiDataMetaService', () => {
  let service: BiDataMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiDataMetaService],
    }).compile();

    service = module.get<BiDataMetaService>(BiDataMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
