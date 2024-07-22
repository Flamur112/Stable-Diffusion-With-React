import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { GenerateImageDto } from './generate-image.dto';
import { lastValueFrom } from 'rxjs';
import { getDataFolderPath, persistData } from '../../utils/file.utils';

@Injectable()
export class StableDiffusionIntegrationService {
    private readonly logger = new Logger(StableDiffusionIntegrationService.name);

    constructor(private readonly httpService: HttpService) {}

    async generateImage(data: GenerateImageDto) {
        const engineId = 'stable-diffusion-xl-1024-v1-0';
        const url = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'image/png',
            'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        };

        const payload = {
            "text_prompts": [
                {
                    "text": data.prompt,
                    "weight": 1
                }
            ],
            "cfg_scale": 7,
            "seed": 0,
            "steps": 50,
            "samples": 1,
            "style_preset": "photographic",
            "height": 1024,
            "width": 1024
        };

        try {
            this.logger.log(`Sending request to Stability AI API with prompt: ${data.prompt}`);
            const result = this.httpService.post(url, payload, { 
                headers,
                responseType: 'arraybuffer'
            });

            const information = await lastValueFrom(result);
            const filePath = `${getDataFolderPath()}/${Date.now()}.png`;
            await persistData(Buffer.from(information.data), filePath);

            this.logger.log(`Image generated and saved to ${filePath}`);
            return filePath;
        } catch (error) {
            this.logger.error(`Failed to generate image: ${error.message}`);
            if (error.response) {
                this.logger.error(`Response status: ${error.response.status}`);
                this.logger.error(`Response data: ${error.response.data.toString()}`);
            }
            throw new HttpException('Failed to generate image', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}