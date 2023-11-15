import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import spotifyGetRequestPlugin from './spotify-get-request';

const requestDecoratorsPlugin: FastifyPluginAsync = async function requestDecoratorsPlugin(instance) {
    await instance.register(spotifyGetRequestPlugin);
}
export default plugin(requestDecoratorsPlugin);