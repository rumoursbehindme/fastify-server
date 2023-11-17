// import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { IQueryString } from '../../lib/types';
import fastifyStatic from '@fastify/static';
import { join } from 'path';

export const homeModule: FastifyPluginAsync = async function homeModule(instance) {
    instance.register(fastifyStatic, {
        root: join(process.cwd(), 'public'),
        prefix:'/'
    })
    instance.get<IQueryString>('/', (req, reply) => {
        if (req.session.authenticated) {
            return reply.sendFile('index.html');
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
