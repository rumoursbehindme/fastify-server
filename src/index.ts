import Fastify from 'fastify';
import coreModule from './modules/core/core';
import ini from 'ini';
import fs from 'fs/promises';
import { join } from 'node:path/posix';

(async () => {
    const app = Fastify();
    await app.register(coreModule);
    const filePath = join(process.cwd(), '/config/authentication.ini');
    const data = ini.parse(await fs.readFile(filePath, 'utf-8'));

    app.get('/data',(_req,reply)=>reply.send(data))
    app.listen({ port: 8080 }, (err) => {
        if (err) throw err;
        console.log('Server is listening on http://localhost:8080');
    });

})();
