import { Test, TestingModule } from '@nestjs/testing';
import { ChutpagluController } from './chutpaglu.controller';
import { ChutpagluService } from './chutpaglu.service';

describe('ChutpagluController', () => {
  let controller: ChutpagluController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChutpagluController],
      providers: [ChutpagluService],
    }).compile();

    controller = module.get<ChutpagluController>(ChutpagluController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
