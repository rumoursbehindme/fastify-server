import { FastifyPluginAsync } from "fastify";
import plugin from "fastify-plugin";
import { getRequest } from "../../../common/api-handling";

const userDetails: FastifyPluginAsync = async function userDetails(instance) {

    instance.get('/user-details', async (req, reply) => {

        try {
            const { tokenSet: { token_type, access_token } } = req.session;
            const headers = {
                'Authorization': token_type + ' ' + access_token
            };
            const response = await getRequest(
                {
                    url: 'https://api.spotify.com/v1/me', headers
                });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const data = await response.json(); // Convert response to JSON

            return reply.send(data);

        } catch (error) {
            reply.code(500).send(error);
        }

    })
}

export default plugin(userDetails);