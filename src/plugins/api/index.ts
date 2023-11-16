import { FastifyPluginAsync } from "fastify";
// import plugin from "fastify-plugin";
import userDetails from "./user-details/user-details";
import { requiresAuthenticated } from "../../common/prehandlers/requires-authenticated";
import addPrehandlers from "../utils/add-prehandlers";

export const apiPlugin: FastifyPluginAsync = async function apiPlugin(instance) {

    await instance.register(addPrehandlers)
    instance.addPrehandlers([requiresAuthenticated]);
    await instance.register(userDetails);
    console.log('Registered API Plugin')
}

// export default plugin(apiPlugin);