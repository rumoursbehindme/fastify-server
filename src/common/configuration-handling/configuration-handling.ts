import { parse } from 'ini';
import { join } from 'path';
import { readFile, readdir } from 'fs/promises';

export async function getConfigurations() {
    const configFolderPath = join(process.cwd(), 'config');
    try {

        const allConfigFiles = await readdir(configFolderPath);

        const serverConfigurations = {};
        const coreConfigurations = {};

        await Promise.all(
            allConfigFiles
                .map(async (file) => {
                    const configFilePath = join(configFolderPath, file);
                    const parsedData = parse(await readFile(configFilePath, 'utf-8'));
                    if (file.toLowerCase() === 'server.ini') {
                        Object.assign(serverConfigurations, parsedData)
                    }
                    else {
                        Object.assign(coreConfigurations, parsedData);
                    }
                }));

        return ({ serverConfigurations, coreConfigurations });
    }
    catch (error) {
        console.log(error, 'Not able to read the configuration file');
    }
};


