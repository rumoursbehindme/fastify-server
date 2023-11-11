import Fastify from 'fastify';
import coreModule from './modules/core/core';
import { getConfigurations } from './common/configuration-handling/configuration-handling';
import { IConfigurations } from './lib/types';

(async () => {
    const app = Fastify();
    const configurations = await getConfigurations();

    if (configurations) {
        const { coreConfigurations, serverConfigurations: { port } } = configurations as IConfigurations;
        await app.register(coreModule, coreConfigurations);
        app.listen({ port }, (err) => {
            if (err) throw err;
            console.log(`Server is listening on http://localhost:${port}`);
        });
    }
    else {
        console.log('Configurations is incorrect unable to start the server')
    }
})();
