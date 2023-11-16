import { FastifyInstance } from "fastify";
import { IQueryString } from "../../../lib/types";

export async function loginRoutes(instance: FastifyInstance) {

    instance.addHook<IQueryString>('preHandler', async (req, reply) => {
        if (req.session.authenticated) {
            const redirectUrl = req.query.returnURL ?? '/';
            return reply.redirect(redirectUrl);
        }
    })

    instance.get<IQueryString>('/login', async (req, reply) => {
        const returnURL = req.query.returnURL ?? '/';
        reply.redirect(await instance.getAuthorizationUrl({ returnURL }));
    });

    instance.get<IQueryString>('/callback', async (req, reply) => {
        const params = instance.oidcClient.callbackParams(req as any);
        const tokenset = await instance.handleCallback(params);
        req.session.authenticated = true;
        req.session.tokenSet = tokenset;
        const redirectURL = params.state ? JSON.parse(atob(params.state)).returnURL : '/';
        reply.redirect(redirectURL);
    });
}