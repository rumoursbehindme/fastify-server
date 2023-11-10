import { FastifyInstance } from "fastify";

export async function loginRoutes(instance: FastifyInstance, issuerOptions: any) {
    instance.get('/login', async (_req, reply) => {
        reply.redirect(instance.oidcClient.authorizationUrl(issuerOptions));
    });

    instance.get('/callback', async (req, reply) => {
        const params = instance.oidcClient.callbackParams(req as any);
        const tokenset = await instance.oidcClient.oauthCallback(issuerOptions.redirect_uri, params);
        req.session.authenticated = true;
        req.session.tokenSet = tokenset;
        reply.redirect('/vplay');
    });
}