import { Test, TestingModule } from '@nestjs/testing';
import { ChequesController } from './cheques.controller';
import { ChequesService } from './cheques.service';

describe('ChequesController', () => {
  let controller: ChequesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChequesController],
      providers: [ChequesService],
    }).compile();

    controller = module.get<ChequesController>(ChequesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
