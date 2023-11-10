import { preHandlerAsyncHookHandler } from "fastify";

export const requiresAuthenticated: preHandlerAsyncHookHandler = async function requiresAuthebticated(req, reply) {
    if (req.session.authenticated) {
        return;
    }
    return reply.redirect('/login');
}