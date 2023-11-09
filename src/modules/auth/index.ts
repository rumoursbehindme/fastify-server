import fastify, { FastifyPluginAsync } from 'fastify';
import { issuerOptions } from '../../config/auth';
import plugin from 'fastify-plugin';

declare module "fastify" {
    interface FastifyRequest {
        tokenSet: any;
    }
}

const authenticationModule: FastifyPluginAsync = async function authenticationModule(instance) {
    instance.get('/login', async (_req, reply) => {
        reply.redirect(instance.oidcClient.authorizationUrl(issuerOptions));
    });

    instance.get('/callback', async (req, reply) => {
        const params = instance.oidcClient.callbackParams(req as any);
        const tokenset = await instance.oidcClient.oauthCallback(issuerOptions.redirect_uri, params);
        req.session.tokenSet = tokenset;
        instance.decorateRequest('tokenSet', ()=> tokenset);
        reply.redirect('/vplay');
    });

    instance.get('/vplayed', (req, reply) => {
        reply.send(req.session.tokenSet)
    })

    console.log("Registered auth module.")
}

export default plugin(authenticationModule)