import { FastifyInstance } from 'fastify';

export async function logoutRoutes(instance: FastifyInstance) {
    instance.get('/logout', async (req, reply) => {
        await req.session.destroy();
        return reply.redirect('/');
    })
}