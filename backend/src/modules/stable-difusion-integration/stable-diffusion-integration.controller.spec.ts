import { Test, TestingModule } from '@nestjs/testing';
import { StableDifusionIntegrationController } from './stable-diffusion-integration.controller';

describe('StableDifusionIntegrationController', () => {
  let controller: StableDifusionIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StableDifusionIntegrationController],
    }).compile();

    controller = module.get<StableDifusionIntegrationController>(StableDifusionIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
