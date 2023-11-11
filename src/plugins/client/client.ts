import { FastifyPluginAsync, } from 'fastify';
import { CallbackParamsType, Client, Issuer, TokenSet } from "openid-client";
import plugin from 'fastify-plugin'
import { IClientPluginsOptions } from './types';

declare module 'fastify' {
    interface FastifyInstance {
        oidcClient: Client;
        getAuthorizationUrl(): Promise<string>;
        handleCallback(params: CallbackParamsType): Promise<TokenSet>
    }
}
const clientPlugin: FastifyPluginAsync<IClientPluginsOptions> = async (instance, { issuerOptions }) => {
    const issuer = await Issuer.discover('https://accounts.spotify.com');
    const client = new issuer.Client({ ...issuerOptions });
    instance.decorate('oidcClient', client);

    instance.decorate('getAuthorizationUrl', async function getAuthorizationUrl() {
        return client.authorizationUrl({ ...issuerOptions });
    });

    instance.decorate('handleCallback', async function handleCallback(params) {
        return client.oauthCallback(issuerOptions.redirect_uri, params)
    });

    console.log("Registered client Plugin.");
}

export default plugin(clientPlugin);