import { GenerateImageDto } from './generate-image.dto';

export function createPrompt(data: GenerateImageDto, fields: Record<string, string>) {
    const promptParts = [data.prompt];

    // Define the attributes to check and merge
    const attributes = [
        'color', 'breed', 'snout', 'eyecolor', 'nailcolor', 'fur', 'pose',
        'bodyType', 'tail', 'coatTexture', 'style', 'background', 'coat', 'ear', 'ears'
    ];

    // Merge user-provided attributes with predetermined fields
    attributes.forEach(attr => {
        const value = data[attr as keyof GenerateImageDto] || fields[attr];
        if (value) {
            promptParts.push(`${attr.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${value}`);
        }
    });

    return promptParts.join(', ');
}
