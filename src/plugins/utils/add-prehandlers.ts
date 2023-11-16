import { FastifyPluginAsync, preHandlerAsyncHookHandler } from "fastify";
import plugin from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        addPrehandlers(prehandlers: preHandlerAsyncHookHandler[]): void
    }
}

const addPrehandlersPlugin: FastifyPluginAsync = async function (instance) {

    instance.decorate('addPrehandlers', function (prehandlers: preHandlerAsyncHookHandler[]) {
        prehandlers.forEach((preHandler) => {
            instance.addHook('preHandler', preHandler);
        });
    })
}

export default plugin(addPrehandlersPlugin);