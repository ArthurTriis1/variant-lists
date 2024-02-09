import Fastify from "fastify";

const server = Fastify();

server.get("/ping", async () => {
	return { pong: "it worked!" };
});

server
	.listen({ port: 3000 })
	.then((value) => console.log(`Server started on: ${value}`));
