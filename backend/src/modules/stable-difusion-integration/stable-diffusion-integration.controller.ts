import { Controller, Post, Body } from '@nestjs/common';
import { GenerateImageDto } from '../../utils/generate-image.dto';
import { StableDiffusionIntegrationService } from './stable-diffusion-integration.service';

@Controller('stable-difusion-integration')
export class StableDifusionIntegrationController {
    constructor(private readonly service:StableDiffusionIntegrationService){}


    @Post()
    async generateImage(@Body() data:GenerateImageDto){
        return this.service.generateImage(data);
    }
}
