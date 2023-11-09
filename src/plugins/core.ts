import { FastifyPluginAsync } from 'fastify';
import sessionPlugin from './session';
import client from './client';
import plugin from 'fastify-plugin';

const corePlugins: FastifyPluginAsync = async function corePlugins(instance, options) {
    await instance.register(sessionPlugin);
    await instance.register(client);
    console.log("Registered Core Plugin.")
}

export default plugin(corePlugins);