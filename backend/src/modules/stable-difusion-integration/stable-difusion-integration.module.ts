import { Module } from '@nestjs/common';
import { StableDiffusionIntegrationService } from './stable-diffusion-integration.service';
import { StableDifusionIntegrationController } from './stable-diffusion-integration.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [StableDiffusionIntegrationService],
  controllers: [StableDifusionIntegrationController]
})
export class StableDifusionIntegrationModule {}