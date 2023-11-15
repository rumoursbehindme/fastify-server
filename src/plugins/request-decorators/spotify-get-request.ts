import { FastifyPluginAsync } from 'fastify';
import plugin from 'fastify-plugin';
import axios, { AxiosResponse } from 'axios';
import { ISpotifyGetRequestOptions } from './types';

declare module 'fastify' {
    interface FastifyRequest {
        spotifyGetRequest(options: ISpotifyGetRequestOptions): Promise<AxiosResponse | undefined>
    }
}

const spotifyGetRequestPlugin: FastifyPluginAsync = async function spotifyGetRequestPlugin(instance) {

    instance.decorateRequest('spotifyGetRequest', async function spotifyGetRequest(options: ISpotifyGetRequestOptions) {
        try {
            const { headers: requestHeaders, url } = options;
            let headers;
            if (requestHeaders) {
                headers = requestHeaders;
            }
            else {
                const { tokenSet: { token_type, access_token } } = this.session;
                headers = {
                    Authorization: token_type + ' ' + access_token
                }
            }
            return axios.get(url, {
                headers
            })
        } catch (error) {
            //
        }
    }
    );
}

export default plugin(spotifyGetRequestPlugin);