import { Test, TestingModule } from '@nestjs/testing';
import { FsController } from './fs.controller';
import { FsService } from './fs.service';

describe('FsController', () => {
  let controller: FsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FsController],
      providers: [FsService],
    }).compile();

    controller = module.get<FsController>(FsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
