import Fastify from 'fastify';
import coreModule from './modules/core/core';
import { getConfigurations } from './common/configuration-handling/configuration-handling';

(async () => {
    const app = Fastify();
    const config: any = await getConfigurations();
    await app.register(coreModule, { config });
    app.listen({ port: 8080 }, (err) => {
        if (err) throw err;
        console.log('Server is listening on http://localhost:8080');
    });

})();
