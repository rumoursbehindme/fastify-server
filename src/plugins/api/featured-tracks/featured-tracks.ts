import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const featuredTracks: FastifyPluginAsync<{ featuredTracksAPIEndpoints: string }> =

    async function playLists(instance, { featuredTracksAPIEndpoints }) {

        instance.get('/api/featured-tracks', async (req, reply) => {
            try {
                const response = await req.spotifyGetRequest({ url: featuredTracksAPIEndpoints });
                if (response?.statusText.toLowerCase() !== 'ok') {
                    throw new Error(`Request failed with status: ${response?.status}`);
                }

                return reply.send(response.data.playlists.items);

            } catch (error) {
                reply.code(500).send('Failed to fetch Featured tracks');
            }
        })
    }

export default plugin(featuredTracks);