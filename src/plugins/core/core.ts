import { FastifyPluginAsync } from "fastify";
import sessionPlugin from "../session/session";
import clientPlugin from "../client/client";
import authenticationPlugin from "../authentication";
import plugin from 'fastify-plugin';
import { apiPlugin } from "../api";
import { homeModule } from "../home/home";
import { ICorePluginOptions } from "./types";
import requestDecorators from '../request-decorators';
import registerMultiplePlugins from "../utils/register-multiple-plugins";

const corePlugin: FastifyPluginAsync<ICorePluginOptions> = async (instance, options) => {
    const { issuerOptions, apiOptions } = options;
    await instance.register(registerMultiplePlugins);

    await instance.registerPlugins(
        [
            { plugin: sessionPlugin },
            { plugin: requestDecorators },
            { plugin: clientPlugin, options: { issuerOptions } },
            { plugin: authenticationPlugin },
            { plugin: homeModule },
            { plugin: apiPlugin, options: { apiOptions } }

        ]
    );

    console.log("Registered Core Plugin.")
}

export default plugin(corePlugin);