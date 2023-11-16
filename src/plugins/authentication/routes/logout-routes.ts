import { FastifyInstance } from 'fastify';
import { requiresAuthenticated } from '../../../common/prehandlers/requires-authenticated';

export async function logoutRoutes(instance: FastifyInstance) {
    instance.addHook('preHandler', requiresAuthenticated);
    instance.get('/logout', async (req, reply) => {
        await req.session.destroy();
        return reply.redirect('/');
    })
}