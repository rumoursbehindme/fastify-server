import Fastify from 'fastify';
import corePlugin from './plugins/core/core';
import { getConfigurations } from './common/configuration-handling/configuration-handling';
import { dayRotatedFileStream } from './lib/types/logger-helper';
import { DateHelper } from './common/utils/date-helper';

(async () => {

    const configurations = await getConfigurations();
    const { coreConfigurations, serverConfigurations: { port, logs: { enabled, disableRequestLogging } } } = configurations;
    const app = Fastify({
        logger: enabled ? {
            base: undefined,
            timestamp: () => `,"time":"${DateHelper.getLogFormattedDate()}"`,
            stream: dayRotatedFileStream()
        } : false,
        disableRequestLogging
    });

    if (configurations) {
        await app.register(corePlugin, coreConfigurations);
        app.listen({ port }, (err) => {
            if (err) throw err;
            console.log(`Server is listening on http://localhost:${port}`);
        });
    }
    else {
        app.log.error('Configurations is incorrect unable to start the server');
    }
})();
