import { FastifyLoggerStreamDestination } from "fastify/types/logger";
import { existsSync } from "fs";
import { appendFile, mkdir } from 'fs/promises';
import { join } from 'path';


const levels = new Map<number, string>();
levels.set(10, 'trace');
levels.set(20, 'debug');
levels.set(30, 'info');
levels.set(40, 'warn');
levels.set(50, 'error');
levels.set(60, 'fatal');

const logDir = join(process.cwd(), 'logs');
export function dayRotatedFileStream(): FastifyLoggerStreamDestination {
    const stream: FastifyLoggerStreamDestination = {
       async write(msg): Promise<void> {
            const logDetails = JSON.parse(msg);
            const level = levels.get(logDetails.level);
            delete logDetails.level;
            const now = new Date();
            const logLevelDir = join(logDir, level!)
            if (!existsSync(logLevelDir)) {
               await mkdir(logLevelDir, { recursive: true });
            }
            const fileName = level + `_${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}.json`;

            await appendFile(join(logLevelDir, fileName), JSON.stringify(logDetails, null, 2))

        }
    };
    return stream;
}
