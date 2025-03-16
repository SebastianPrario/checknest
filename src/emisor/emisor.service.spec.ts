import { Test, TestingModule } from '@nestjs/testing';
import { EmisorService } from './emisor.service';

describe('EmisorService', () => {
  let service: EmisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmisorService],
    }).compile();

    service = module.get<EmisorService>(EmisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
