import { FastifyPluginAsync } from 'fastify';
import sessionPlugin from './session';
import client from './client';
import plugin from 'fastify-plugin';
import { ICorePluginsOptions } from './types';

const corePlugins: FastifyPluginAsync<ICorePluginsOptions> = async function corePlugins(instance, options) {
    const { issuerOptions } = options;
    await instance.register(sessionPlugin);
    await instance.register(client, { issuerOptions });
    console.log("Registered Core Plugin.")
}

export default plugin(corePlugins);