import { Test, TestingModule } from '@nestjs/testing';
import { BiDataViewService } from './bi-data-view.service';

describe('BiDataViewService', () => {
  let service: BiDataViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [BiDataViewService] }).compile();

    service = module.get<BiDataViewService>(BiDataViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
