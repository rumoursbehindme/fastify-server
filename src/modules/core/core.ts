import { FastifyPluginAsync } from "fastify";
import corePlugins from "../../plugins/core";
import authenticationModule from "../auth";
import plugin from 'fastify-plugin';
import vplay from "../vplay/index";
import { homeModule } from "../home/home";

const coreModule: FastifyPluginAsync = async (instance) => {
    await instance.register(corePlugins);
    await instance.register(authenticationModule);
    await instance.register(homeModule);
    await instance.register(vplay);
    console.log("Registered core module.")
}

export default plugin(coreModule);