import { Test, TestingModule } from '@nestjs/testing';
import { BiDataViewController } from './bi-data-view.controller';
import { BiDataViewService } from './bi-data-view.service';

describe('BiDataViewController', () => {
  let controller: BiDataViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiDataViewController],
      providers: [BiDataViewService],
    }).compile();

    controller = module.get<BiDataViewController>(BiDataViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
