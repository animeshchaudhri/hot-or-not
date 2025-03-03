import { Test, TestingModule } from '@nestjs/testing';
import { ChutpagluService } from './chutpaglu.service';

describe('ChutpagluService', () => {
  let service: ChutpagluService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChutpagluService],
    }).compile();

    service = module.get<ChutpagluService>(ChutpagluService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
