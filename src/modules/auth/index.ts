import { FastifyPluginAsync } from 'fastify';
import { issuerOptions } from '../../config/auth';
import plugin from 'fastify-plugin';
import { loginRoutes } from './routes/login-routes';

declare module "fastify" {
    interface FastifyRequest {
        tokenSet: any;
    }
}

// Authorization code flow

const authenticationModule: FastifyPluginAsync = async function authenticationModule(instance) {
    instance.register(loginRoutes, issuerOptions)
    console.log("Registered auth module.")
}

export default plugin(authenticationModule)