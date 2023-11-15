import { FastifyPluginAsync } from 'fastify';
import plugin from 'fastify-plugin';
import { loginRoutes, logoutRoutes } from './routes';
import { IAuthenticationModuleOptions } from './types';

declare module "fastify" {
    interface FastifyRequest {
        tokenSet: any;
    }
}

// Authorization code flow
const authenticationPlugin: FastifyPluginAsync<IAuthenticationModuleOptions> = async function authenticationModule(instance) {
    await instance.register(loginRoutes);
    await instance.register(logoutRoutes);
    console.log("Registered Authentication Plugin.");
}

export default plugin(authenticationPlugin)