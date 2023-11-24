import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const newReleases: FastifyPluginAsync<{ newReleasesAPIEndpoint: string }> =

    async function playLists(instance, { newReleasesAPIEndpoint }) {

        instance.get('/api/new-releases', async (req, reply) => {
            try {
                const response = await req.spotifyGetRequest({ url: newReleasesAPIEndpoint });
                if (response?.statusText.toLowerCase() !== 'ok') {
                    throw new Error(`Request failed with status: ${response?.status}`);
                }

                return reply.send(response.data.albums.items);

            } catch (error) {
                reply.code(500).send('Failed to fetch New Releases');
            }
        })
    }

export default plugin(newReleases);