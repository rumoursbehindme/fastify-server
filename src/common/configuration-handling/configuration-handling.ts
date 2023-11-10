import { parse } from 'ini';
import { join } from 'path';
import { readFile } from 'fs/promises';

export async function getConfigurations() {
    const filePath = join(process.cwd(), '/config/base/authentication.ini');
    try {
        const data = await readFile(filePath, 'utf-8');
        return parse(data);
    }
    catch (error) {
        console.log(error, 'Not able to read the configuration file');
    }
};


