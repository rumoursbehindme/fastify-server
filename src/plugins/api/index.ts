import { FastifyPluginAsync } from "fastify";
import plugin from "fastify-plugin";
import userDetails from "./user-details/user-details";

const apiPlugin: FastifyPluginAsync = async function apiPlugin(instance) {

    await instance.register(userDetails);
}

export default plugin(apiPlugin);