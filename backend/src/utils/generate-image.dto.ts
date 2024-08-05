export class GenerateImageDto {
    prompt: string;
    type: 'dog' | 'cat';
    color?: string;
    breed?: string;
    pose?: string;
    snoutLength?: string;
    eyeColor?: string;
    eyeShape?: string;
    coatLength?: string;
    nailColor?: string;
    earLength?: string;
    earShape?: string;
    bodyShape?: string;
    legLength?: string;
    legBuild?: string;
    tailLength?: string;
    tailShape?: string;
    tailFeathers?: string;
    feetSize?: string;
    feetPads?: string;
    background?: string;
    [key: string]: string | undefined; // Allow other properties as well
}