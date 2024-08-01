import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { GenerateImageDto } from '../../utils/generate-image.dto';
import { lastValueFrom } from 'rxjs';
import { getDataFolderPath, persistData } from '../../utils/file.utils';

@Injectable()
export class StableDiffusionIntegrationService {
    private readonly logger = new Logger(StableDiffusionIntegrationService.name);

    constructor(private readonly httpService: HttpService) {}

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    async generateImage(data: GenerateImageDto) {
        const engineId = 'stable-diffusion-xl-1024-v1-0';
        const url = `https://api.stability.ai/v1/generation/${engineId}/text-to-image`;
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'image/png',
            'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        };

        const type = data.type as 'dog' | 'cat';
        
        // Define lists of possible values
        const colors = type === 'dog' ? ["black and white", "brown", "golden", "gray", "spotted"] : ["gray", "black", "white", "orange", "tabby"];
        const breeds = type === 'dog' ? ["Labrador Retriever", "German Shepherd", "Golden Retriever", "Bulldog", "Beagle", "Poodle", "Rottweiler", "Yorkshire Terrier", "Dachshund", "Siberian Husky"] : ["Persian", "Maine Coon", "Siamese", "Sphynx", "Bengal"];
        const snoutLengths = type === 'dog' ? ["small", "medium", "large"] : [];
        const eyeColors = type === 'dog' ? ["red", "blue", "green", "yellow", "brown"] : [];
        const eyeShapes = type === 'dog' ? ["almond-shaped", "round", "oval", "hooded", "wide-set", "close-set", "droopy", "raised"] : [];
        const coatLengths = type === 'dog' ? ["short", "medium", "long", "curly", "silky", "fluffy"] : [];
        const nailColors = type === 'dog' ? ["white", "black"] : [];
        const earLengths = type === 'dog' ? ["short", "medium", "long"] : [];
        const earShapes = type === 'dog' ? ["erect", "floppy", "semi-erect", "folded", "hanging", "cropped", "feathered"] : [];
        const bodyShapes = type === 'dog' ? ["slender", "muscular", "stocky"] : [];
        const legLengths = type === 'dog' ? ["short", "medium", "long"] : [];
        const legBuilds = type === 'dog' ? ["lean", "muscular", "stocky"] : [];
        const tailLengths = type === 'dog' ? ["short", "medium", "long"] : [];
        const tailShapes = type === 'dog' ? ["curved", "straight", "bent"] : [];
        const tailFeathers = type === 'dog' ? ["none", "feathered", "plume-like"] : [];
        const feetSizes = type === 'dog' ? ["small", "medium", "large"] : [];
        const feetPads = type === 'dog' ? ["black", "white"] : [];
        const poses = ["standing, fully in frame, upright. Keep it standing in one position and the same for every other pet generated. Make it Look left."];
        const lighting = "slightly above normal lighting, allowing features to be visibly seen.";
        const wires = "detailed, very thin, and nicely organized wireframe visible just above the skin";
        const style = "a combination of wireframe and realistic elements, with the wireframe being prominent";
        const background = "Black background. Always keep the background black.";

        // Select random attributes
        const fields = {
            color: this.getRandomElement(colors),
            breed: this.getRandomElement(breeds),
            pose: this.getRandomElement(poses),
            snoutLength: type === 'dog' ? this.getRandomElement(snoutLengths) : undefined,
            eyeColor: type === 'dog' ? this.getRandomElement(eyeColors) : undefined,
            eyeShape: type === 'dog' ? this.getRandomElement(eyeShapes) : undefined,
            coatLength: type === 'dog' ? this.getRandomElement(coatLengths) : undefined,
            nailColor: type === 'dog' ? this.getRandomElement(nailColors) : undefined,
            earLength: type === 'dog' ? this.getRandomElement(earLengths) : undefined,
            earShape: type === 'dog' ? this.getRandomElement(earShapes) : undefined,
            bodyShape: type === 'dog' ? this.getRandomElement(bodyShapes) : undefined,
            legLength: type === 'dog' ? this.getRandomElement(legLengths) : undefined,
            legBuild: type === 'dog' ? this.getRandomElement(legBuilds) : undefined,
            tailLength: type === 'dog' ? this.getRandomElement(tailLengths) : undefined,
            tailShape: type === 'dog' ? this.getRandomElement(tailShapes) : undefined,
            tailFeathers: type === 'dog' ? this.getRandomElement(tailFeathers) : undefined,
            feetSize: type === 'dog' ? this.getRandomElement(feetSizes) : undefined,
            feetPads: type === 'dog' ? this.getRandomElement(feetPads) : undefined,
            lighting: type === 'dog' ? lighting : undefined,
            wires: type === 'dog' ? wires : undefined,
            totalPets: "1"
        };

        // Create the prompt
        const promptParts = [data.prompt];
        Object.entries(fields).forEach(([key, value]) => {
            if (value) {
                promptParts.push(`${key}: ${value}`);
            }
        });

        promptParts.push(style);
        promptParts.push(background);

        const fullPrompt = promptParts.join(', ');

        const payload = {
            "text_prompts": [
                { "text": background, "weight": 5 },
                { "text": style, "weight": 3 },
                { "text": fields.pose, "weight": 2 },
                { "text": fullPrompt, "weight": 1 }
            ],
            "cfg_scale": 12,  // Adjusted for stronger adherence to prompt
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
