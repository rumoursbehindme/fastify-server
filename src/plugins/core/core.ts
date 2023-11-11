import { FastifyPluginAsync } from "fastify";
import sessionPlugin from "../session/session";
import clientPlugin from "../client/client";
import authenticationPlugin from "../authentication";
import plugin from 'fastify-plugin';
import vplay from "../vplay/index";
import { homeModule } from "../home/home";
import { ICorePluginOptions } from "./types";

const corePlugin: FastifyPluginAsync<ICorePluginOptions> = async (instance, options) => {
    const { issuerOptions } = options;
    await instance.register(sessionPlugin);
    await instance.register(clientPlugin, { issuerOptions });
    await instance.register(authenticationPlugin);
    await instance.register(homeModule);
    await instance.register(vplay);
    console.log("Registered core module.")
}

export default plugin(corePlugin);