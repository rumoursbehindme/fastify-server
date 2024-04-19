import { preHandlerAsyncHookHandler } from "fastify";

export const requiresAuthenticated: preHandlerAsyncHookHandler = async function requiresAuthebticated(req, reply) {
    if (req.session.authenticated) {
        return;
    };
    const { url } = req;
    return reply.redirect(`/player?returnURL=${url}&error=Please authenticate to access this route: ${url}`);
}