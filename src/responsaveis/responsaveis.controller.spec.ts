import { Test, TestingModule } from '@nestjs/testing';
import { ResponsaveisController } from './responsaveis.controller';
import { ResponsaveisService } from './responsaveis.service';

describe('ResponsaveisController', () => {
  let controller: ResponsaveisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsaveisController],
      providers: [ResponsaveisService],
    }).compile();

    controller = module.get<ResponsaveisController>(ResponsaveisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
