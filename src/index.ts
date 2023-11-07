import fastify from "fastify";

const app = fastify({
    logger: {
        base: undefined,
    
    }
});

app.get('/', (req, reply) => {
    reply.send(req.ip);
});

app.listen({ port: 8080 });