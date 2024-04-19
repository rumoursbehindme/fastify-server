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

    instance.addHook('onRequest', async (req, reply) => {
        if (req.url === '/') {
            return reply.redirect('/player')
        }
    })
    
    instance.get<IQueryString>('/player*', async (req, reply) => {
        if (req.session.authenticated) {
            try {
                const module = await readFile(join(process.cwd(), 'public/index.html'), 'utf-8');
                if (module) {
                    return reply.sendFile('index.html');
                }
            } catch (error: any) {
                throw new Error(error)
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
