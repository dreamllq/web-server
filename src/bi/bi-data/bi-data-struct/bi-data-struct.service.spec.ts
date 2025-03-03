import { Test, TestingModule } from '@nestjs/testing';
import { BiDataStructService } from './bi-data-struct.service';

describe('BiDataStructService', () => {
  let service: BiDataStructService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiDataStructService],
    }).compile();

    service = module.get<BiDataStructService>(BiDataStructService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
