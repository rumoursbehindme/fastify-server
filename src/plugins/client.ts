import { FastifyPluginAsync, } from 'fastify';
import { Client, Issuer } from "openid-client";
import { issuerOptions } from '../../config/auth';
import plugin from 'fastify-plugin'

declare module 'fastify' {
    interface FastifyInstance {
        oidcClient: Client
    }
}
const client: FastifyPluginAsync = async (instance) => {
    const issuer = await Issuer.discover('https://accounts.spotify.com');
    const client = new issuer.Client(issuerOptions);
    instance.decorate('oidcClient', client);
    console.log("Registered client Plugin.");
}

export default plugin(client);