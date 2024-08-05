import * as path from 'path';
import * as fs from 'fs';

const ASSETS_FOLDER_NAME = "stable-difsuion-api-images";

const createFolderIfNotExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}

export const getDataFolderPath = () => {
    // Resolve the path to the project root
    const projectRoot = path.resolve(__dirname, '../..'); // Adjust this if your structure is different
    const result = path.resolve(projectRoot, ASSETS_FOLDER_NAME);
    createFolderIfNotExists(result);

    return result;
}

export const persistData = (data: any, localFilePath: string) =>
    fs.writeFileSync(localFilePath, data);