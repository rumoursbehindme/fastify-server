import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const topTracks: FastifyPluginAsync =

    async function topTracks(instance) {

        instance.get('/api/top-tracks', async (req, reply) => {
            try {
                const response = await req.spotifyGetRequest({ url: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5' });
                if (response?.statusText.toLowerCase() !== 'ok') {
                    throw new Error(`Request failed with status: ${response?.status}`);
                }

                return reply.send(response.data);

            } catch (error) {
                instance.log.error(error, 'Failed to fetch top tracks.')
                reply.code(500).send(error);
            }
        })
    }

export default plugin(topTracks);