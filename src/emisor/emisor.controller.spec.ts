import { Test, TestingModule } from '@nestjs/testing';
import { EmisorController } from './emisor.controller';
import { EmisorService } from './emisor.service';

describe('EmisorController', () => {
  let controller: EmisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmisorController],
      providers: [EmisorService],
    }).compile();

    controller = module.get<EmisorController>(EmisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
