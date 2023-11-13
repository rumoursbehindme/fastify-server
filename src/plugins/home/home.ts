// import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

export const homeModule: FastifyPluginAsync = async function homeModule(instance) {
    instance.get('/', (req, reply) => {
        if (req.session.authenticated) {
            return reply.send('Yes you are authenticated...')
        }
        return reply.type('text/html').send(`<a href='/login'>Login</a>`);
    });
}

