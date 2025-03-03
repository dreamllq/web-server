import { Test, TestingModule } from '@nestjs/testing';
import { BiDataStructController } from './bi-data-struct.controller';
import { BiDataStructService } from './bi-data-struct.service';

describe('BiDataStructController', () => {
  let controller: BiDataStructController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiDataStructController],
      providers: [BiDataStructService],
    }).compile();

    controller = module.get<BiDataStructController>(BiDataStructController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
