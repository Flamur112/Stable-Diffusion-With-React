import { Test, TestingModule } from '@nestjs/testing';
import { StableDiffusionIntegrationService } from './stable-diffusion-integration.service';

describe('StableDiffusionIntegrationService', () => {
  let service: StableDiffusionIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StableDiffusionIntegrationService],
    }).compile();

    service = module.get<StableDiffusionIntegrationService>(StableDiffusionIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
