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
const authenticationModule: FastifyPluginAsync<IAuthenticationModuleOptions> = async function authenticationModule(instance) {
    instance.register(loginRoutes)
    console.log("Registered auth module.")
}

export default plugin(authenticationModule)