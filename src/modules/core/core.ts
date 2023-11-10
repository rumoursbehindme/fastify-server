import { FastifyPluginAsync } from "fastify";
import corePlugins from "../../plugins/core";
import authenticationModule from "../authentication";
import plugin from 'fastify-plugin';
import vplay from "../vplay/index";
import { homeModule } from "../home/home";
import { ICoreModuleOptions } from "./types";

const coreModule: FastifyPluginAsync<ICoreModuleOptions> = async (instance, options) => {
    const { config: { issuerOptions } } = options;
    await instance.register(corePlugins, { issuerOptions });
    await instance.register(authenticationModule);
    await instance.register(homeModule);
    await instance.register(vplay);
    console.log("Registered core module.")
}

export default plugin(coreModule);