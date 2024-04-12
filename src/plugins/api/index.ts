import { FastifyPluginAsync } from "fastify";
// import plugin from "fastify-plugin";
import userDetailsAPIPlugin from "./user-details/user-details";
import { requiresAuthenticated } from "../../common/prehandlers/requires-authenticated";
import addPrehandlers from "../utils/add-prehandlers";
import playlistsAPIPlugin from "./playlists/playlists";
import newReleasesAPIPlugin from "./new-releases/new-releases";
import { IAPIPluginOptions } from "./types/types";
import topTracks from "./top-tracks/top-tracks";

export const apiPlugin: FastifyPluginAsync<IAPIPluginOptions> = async function apiPlugin(instance, { apiOptions }) {
    await instance.register(addPrehandlers);
    instance.addPrehandlers([requiresAuthenticated]);

    const { userDetailsAPIEndpoint, playListsAPIOptions, newReleasesAPIEndpoint } = apiOptions;
    await instance.registerPlugins(
        [
            { plugin: userDetailsAPIPlugin, options: { userDetailsAPIEndpoint } },
            { plugin: playlistsAPIPlugin, options: { playListsAPIOptions } },
            { plugin: newReleasesAPIPlugin, options: { newReleasesAPIEndpoint } },
            { plugin: topTracks }
        ]
    )
    instance.log.info('Registered API Plugin')
}

// export default plugin(apiPlugin);