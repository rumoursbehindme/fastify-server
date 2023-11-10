// import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

export const homeModule: FastifyPluginAsync = async function homeModule(instance) {
    instance.get('/', (_req, reply) => {
        return reply.type('text/html').send(`<a href='/login'>Login</a>`);
    });
}

