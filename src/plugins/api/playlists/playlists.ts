import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const playLists: FastifyPluginAsync<{ playListsAPIEndpoint: string }> =

    async function playLists(instance, { playListsAPIEndpoint }) {

        instance.get('/playlists', async (req, reply) => {
            try {
                const response = await req.spotifyGetRequest({ url: playListsAPIEndpoint });
                if (response?.statusText.toLowerCase() !== 'ok') {
                    throw new Error(`Request failed with status: ${response?.status}`);
                }

                return reply.send(response.data);

            } catch (error) {
                reply.code(500).send('Failed to fetch PlayLists');
            }
        })
    }

export default plugin(playLists);