import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fetch from 'node-fetch';

const vplay: FastifyPluginAsync = async function vplay(instance) {

    instance.get('/vplay', async (req, reply) => {
        // const headers = {
        //     'Authorization': tokenSet.token_type + ' ' + tokenSet.access_token
        // };

        try {
            // const response = await fetch('https://api.spotify.com/v1/me', {
            //     method: 'GET',
            //     headers
            // });

            // if (!response.ok) {
            //     throw new Error(`Request failed with status: ${response.status}`);
            // }

            // const data = await response.json(); // Convert response to JSON

            return reply.send(req.tokenSet());
        } catch (error) {
            reply.code(500).send({ error: 'Internal Server Error' });
        }
    })
}

export default plugin(vplay);
