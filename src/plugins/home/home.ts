// import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { IQueryString } from '../../lib/types';
import fastifyStatic from '@fastify/static';
import { join } from 'path';
import { readFile } from 'fs/promises';

export const homeModule: FastifyPluginAsync = async function homeModule(instance) {
    instance.register(fastifyStatic, {
        root: join(process.cwd(), 'public'),
        prefix: '/'
    })
    instance.get<IQueryString>('/', async (req, reply) => {
        if (req.session.authenticated) {
            try {
                const module = await readFile(join(process.cwd(), 'public/index.html'), 'utf-8');
                if (module) {
                    return reply.sendFile('index.html');
                }
            } catch (error) {
                return reply.send({
                    description: 'Please add the front-end module correctly.',
                    error
                })
            }
        }
        const { query: { returnURL, error } } = req;
        if (error) {
            return reply.type('text/html').send(
                `<p style='color: red'>${error}</p>
                <a href='/login?returnURL=${returnURL ?? '/'}'>Login</a>`);
        }
        return reply.redirect('/login');
    });
}
