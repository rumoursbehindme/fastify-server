import { FastifyInstance } from "fastify";

export async function loginRoutes(instance: FastifyInstance) {
    instance.get('/login', async (_req, reply) => {
        reply.redirect(await instance.getAuthorizationUrl());
    });

    instance.get('/callback', async (req, reply) => {
        const params = instance.oidcClient.callbackParams(req as any);
        const tokenset = await instance.handleCallback(params);
        req.session.authenticated = true;
        req.session.tokenSet = tokenset;
        reply.redirect('/vplay');
    });
}