import FastifySessionPlugin from '@fastify/session'
import plugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fastifyCookie from '@fastify/cookie';

declare module 'fastify' {
    export interface Session {
        authenticated: boolean;
        tokenSet: any
    }
}

const sessionPlugin: FastifyPluginCallback = async (instance: FastifyInstance, _option) => {
    await instance.register(fastifyCookie);

    await instance.register(FastifySessionPlugin, {
        secret: '7c9ee7ebeee9d648c2fbc327ce8c0d4b16f6fb6473d8e9dbbb5e14e744d6ed7a',
        cookie: {
            httpOnly: true,
            secure: false
        }
    });
    console.log("Registered Session Plugin.")
}


export default plugin(sessionPlugin)