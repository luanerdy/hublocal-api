import { Test, TestingModule } from '@nestjs/testing';
import { ResponsaveisService } from './responsaveis.service';

describe('ResponsaveisService', () => {
  let service: ResponsaveisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsaveisService],
    }).compile();

    service = module.get<ResponsaveisService>(ResponsaveisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
