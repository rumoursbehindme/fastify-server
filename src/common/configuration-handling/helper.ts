import { join, parse } from 'path';
import { readdir } from 'fs/promises';

const directoryPath = (join(process.cwd(), '/config/base'))

export async function readFilenamesWithoutExtensions() {
    try {
      const files = await readdir(directoryPath);
      return  files.map(file => parse(file).name);
    } catch (err) {
      console.error('Error reading directory:', err);
    }
  }