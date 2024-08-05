import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { GenerateImageDto } from '../../utils/generate-image.dto';
import { lastValueFrom } from 'rxjs';
import { getDataFolderPath, persistData } from '../../utils/file.utils';

@Injectable()
export class StableDiffusionIntegrationService {
    private readonly logger = new Logger(StableDiffusionIntegrationService.name);

    // Define the arrays as private class properties
    private colors = ['black', 'white', 'brown', 'golden', 'gray', 'red', 'blue', 'green'];
    private breeds = ['Labrador', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Poodle', 'Beagle'];
    private snoutLengths = ['short', 'medium', 'long'];
    private eyeColors = ['brown', 'blue', 'green', 'amber'];
    private eyeShapes = ['round', 'almond', 'slanted'];
    private coatLengths = ['short', 'medium', 'long'];
    private nailColors = ['black', 'white', 'pink'];
    private earLengths = ['short', 'medium', 'long'];
    private earShapes = ['pointed', 'floppy', 'rounded'];
    private bodyShapes = ['slim', 'muscular', 'stocky'];
    private legLengths = ['short', 'medium', 'long'];
    private legBuilds = ['thin', 'muscular', 'average'];
    private tailLengths = ['short', 'medium', 'long'];
    private tailShapes = ['straight', 'curled', 'fluffy'];
    private tailFeathers = ['none', 'sparse', 'bushy'];
    private feetSizes = ['small', 'medium', 'large'];

    private pose = 'standing looking left';
    private style = 'wireframe and hyper-realistic';
    private background = 'completely black';

    constructor(private readonly httpService: HttpService) {}

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    async generateImage(data: GenerateImageDto): Promise<string> {
        const engineId = 'stable-diffusion-xl-1024-v1-0';
        const url = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'image/png',
            'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        };

        // Select random attributes
        const fields = {
            color: this.getRandomElement(this.colors),
            breed: this.getRandomElement(this.breeds),
            snoutLength: this.getRandomElement(this.snoutLengths),
            eyeColor: this.getRandomElement(this.eyeColors),
            eyeShape: this.getRandomElement(this.eyeShapes),
            coatLength: this.getRandomElement(this.coatLengths),
            nailColor: this.getRandomElement(this.nailColors),
            earLength: this.getRandomElement(this.earLengths),
            earShape: this.getRandomElement(this.earShapes),
            bodyShape: this.getRandomElement(this.bodyShapes),
            legLength: this.getRandomElement(this.legLengths),
            legBuild: this.getRandomElement(this.legBuilds),
            tailLength: this.getRandomElement(this.tailLengths),
            tailShape: this.getRandomElement(this.tailShapes),
            tailFeathers: this.getRandomElement(this.tailFeathers),
            feetSize: this.getRandomElement(this.feetSizes),

            pose: data.pose || this.pose, // Use pose from DTO or default
            style: data.style || this.style, // Use style from DTO or default
            background: data.background || this.background,
        };

        // Create a natural language prompt
        const fullPrompt = `Create a single hyper-realistic, wireframed ${fields.color} ${fields.breed} dog in a ${fields.background} background. The dog should be standing and looking left. It should have a ${fields.snoutLength} snout, ${fields.eyeColor} eyes that are ${fields.eyeShape}, a ${fields.coatLength} coat, ${fields.nailColor} nails, ${fields.earLength} ears that are ${fields.earShape}, a ${fields.bodyShape} body, ${fields.legLength} legs that are ${fields.legBuild}, ${fields.tailLength} tail that is ${fields.tailShape} and has ${fields.tailFeathers} feathers, ${fields.feetSize} feet. Make sure the dog is fully framed in the image and position on the right size.`;

        const payload = {
            "text_prompts": [
                { "text": fullPrompt, "weight": 12 },  // Adjusted weight
                { "text": `dog ${fields.pose}`, "weight": 12 },  // Adjusted weight
                { "text": `${fields.color} dog`, "weight": 12 },  // Adjusted weight
                { "text": this.style, "weight": 12 },  // Adjusted weight
                { "text": "black background", "weight": 35 },  // Adjusted weight
            ],
            "cfg_scale": 35,  // Adjusted cfg_scale
            "clip_guidance_preset": "SLOWEST",
            "seed": 0, 
            "steps": 50,
            "samples": 1,
            "height": 1024,
            "width": 1024,
        };

        try {
            this.logger.log(`Sending request to Stability AI API with prompt: ${fullPrompt}`);
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
