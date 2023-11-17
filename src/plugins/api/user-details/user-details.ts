import { FastifyPluginAsync } from "fastify";
import plugin from "fastify-plugin";

const newReleasesAPIPlugin: FastifyPluginAsync<{ userDetailsAPIEndpoint: string }> =

    async function userDetails(instance, { userDetailsAPIEndpoint }) {
        instance.get('/user-details', async (req, reply) => {

            try {
                const response = await req.spotifyGetRequest({ url: userDetailsAPIEndpoint });
                if (response?.statusText.toLowerCase() !== 'ok') {
                    throw new Error(`Request failed with status: ${response?.status}`);
                }

                return reply.send(response.data);

            } catch (error) {
                reply.code(500).send(error);
            }

        })
    }

export default plugin(newReleasesAPIPlugin);