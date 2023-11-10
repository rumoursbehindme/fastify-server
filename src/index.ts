import Fastify from 'fastify';
import coreModule from './modules/core/core';

(async () => {
    const app = Fastify();
    await app.register(coreModule);
    app.listen({ port: 8080 }, (err) => {
        if (err) throw err;
        console.log('Server is listening on http://localhost:8080');
    });

})();
