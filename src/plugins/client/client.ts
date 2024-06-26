import { FastifyPluginAsync, } from 'fastify';
import { CallbackParamsType, Client, Issuer, TokenSet } from "openid-client";
import plugin from 'fastify-plugin'
import { IAuthorizationURLOptions, IClientPluginsOptions } from './types';

declare module 'fastify' {
    interface FastifyInstance {
        oidcClient: Client;
        getAuthorizationUrl(options: IAuthorizationURLOptions): Promise<string>;
        handleCallback(params: CallbackParamsType): Promise<TokenSet>
    }
}
const clientPlugin: FastifyPluginAsync<IClientPluginsOptions> = async (instance, { issuerOptions }) => {
    const issuer = await Issuer.discover('https://accounts.spotify.com');
    const client = new issuer.Client({ ...issuerOptions });
    instance.decorate('oidcClient', client);

    instance.decorate('getAuthorizationUrl', async function getAuthorizationUrl({ returnURL }: IAuthorizationURLOptions) {
        return client.authorizationUrl({ ...issuerOptions, state: btoa(JSON.stringify({ returnURL })) });
    });

    instance.decorate('handleCallback', async function handleCallback(params) {
        return client.oauthCallback(issuerOptions.redirect_uri, { code: params.code, state: params.state as any }, { state: params.state as any })
    });

    instance.log.info("Registered Client Plugin.");
}

export default plugin(clientPlugin);    