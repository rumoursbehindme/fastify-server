import { FastifyPluginAsync } from "fastify";
// import plugin from "fastify-plugin";
import userDetails from "./user-details/user-details";
import { requiresAuthenticated } from "../../common/prehandlers/requires-authenticated";
import addPrehandlers from "../utils/add-prehandlers";
import playlists from "./playlists/playlists";
import newReleases from "./new-releases/new-releases";

export const apiPlugin: FastifyPluginAsync = async function apiPlugin(instance) {

    await instance.register(addPrehandlers);
    instance.addPrehandlers([requiresAuthenticated]);
    await instance.registerPlugins(
        [
            { plugin: userDetails },
            { plugin: playlists },
            { plugin: newReleases }
        ]
    )
    console.log('Registered API Plugin')
}

// export default plugin(apiPlugin);