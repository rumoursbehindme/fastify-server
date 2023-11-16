// import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { IQueryString } from '../../lib/types';

export const homeModule: FastifyPluginAsync = async function homeModule(instance) {
    instance.get<IQueryString>('/', (req, reply) => {
        if (req.session.authenticated) {
            return reply.send('Yes you are authenticated...')
        }
        const { query: { returnURL, error } } = req;
        if (error) {
            return reply.type('text/html').send(
                `<p style='color: red'>${error}</p>
                <a href='/login?returnURL=${returnURL ?? '/'}'>Login</a>`);
        }
        return reply.type('text/html').send(`<a href='/login?returnURL=${returnURL ?? '/'}'>Login</a>`);
    });
}
