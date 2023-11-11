import { FastifyPluginAsync } from 'fastify';
import plugin from 'fastify-plugin';
import { loginRoutes } from './routes/login-routes';
import { IAuthenticationModuleOptions } from './types';

declare module "fastify" {
    interface FastifyRequest {
        tokenSet: any;
    }
}

// Authorization code flow
const authenticationPlugin: FastifyPluginAsync<IAuthenticationModuleOptions> = async function authenticationModule(instance) {
    await instance.register(loginRoutes);
    console.log("Registered auth module.")
}

export default plugin(authenticationPlugin)