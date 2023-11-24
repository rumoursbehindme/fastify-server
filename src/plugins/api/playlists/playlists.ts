import plugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { mergeAPIWithID } from '../../utils';
import { IPlayListsAPIOptions } from '../../../lib/types';


const playlistsAPIPlugin: FastifyPluginAsync<{ playListsAPIOptions: IPlayListsAPIOptions }> =

    async function playlistsAPIPlugin(instance, { playListsAPIOptions }) {

        const { playListsAPIEndpoint, playlistTracksAPIEndPoint } = playListsAPIOptions;

        instance.get('/api/playlists', async (req, reply) => {
            try {
                const response = await req.spotifyGetRequest({ url: playListsAPIEndpoint });
                if (response?.statusText.toLowerCase() !== 'ok') {
                    throw new Error(`Request failed with status: ${response?.status}`);
                }

                return reply.send(response.data);

            } catch (error) {
                reply.code(500).send('Failed to fetch PlayLists');
            }
        });

        instance.get<{ Params: { id: string } }>('/api/playlists/:id', async (req: any, reply) => {
            try {
                const url = mergeAPIWithID(playlistTracksAPIEndPoint, req.params.id);
                if (url) {
                    const response = await req.spotifyGetRequest({ url, });
                    if (response?.statusText.toLowerCase() !== 'ok') {
                        throw new Error(`Request failed with status: ${response?.status}`);
                    }
                    return reply.send(response.data);
                }


            } catch (error) {
                reply.code(500).send('Failed to fetch PlayLists');
            }
        })
    }

export default plugin(playlistsAPIPlugin);