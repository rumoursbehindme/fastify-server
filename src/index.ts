import Fastify from 'fastify';
import corePlugin from './plugins/core/core';
import { getConfigurations } from './common/configuration-handling/configuration-handling';
import { IConfigurations } from './lib/types';
import { dayRotatedFileStream } from './lib/types/logger-helper';
import { DateHelper } from './common/utils/date-helper';

(async () => {
    const app = Fastify({
        logger: {
            base: undefined,
            timestamp: () => `,"time":"${DateHelper.getLogFormattedDate()}"`,
            stream: dayRotatedFileStream()
        }
    });

    const configurations = await getConfigurations();

    if (configurations) {
        const { coreConfigurations, serverConfigurations: { port } } = configurations as IConfigurations;
        await app.register(corePlugin, coreConfigurations);
        app.listen({ port }, (err) => {
            if (err) throw err;
            console.log(`Server is listening on http://localhost:${port}`);
        });
    }
    else {
        app.log.info('Configurations is incorrect unable to start the server')
    }
})();
