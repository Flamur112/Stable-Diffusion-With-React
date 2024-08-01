export class GenerateImageDto {
    prompt: string;
    type: 'dog' | 'cat';
    color: string;
    breed: string;
    pose?: string;
    [key: string]: string | undefined; // Allow other properties as well
}
