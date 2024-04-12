import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { IPlugins } from './types';

declare module 'fastify' {
    interface FastifyInstance {
        registerPlugins(plugins: Array<IPlugins>): Promise<void>
    }
}

const registerMultiplePlugins: FastifyPluginAsync = async function registerMultiplePlugins(instance) {

    instance.decorate('registerPlugins', async function (plugins: Array<IPlugins>) {
        try {
            plugins.forEach(async ({ plugin, options }) => {
                await instance.register(plugin, options)
            })
        }
        catch (error:any) {
            throw new Error(error)
        }
    });
}

export default plugin(registerMultiplePlugins);