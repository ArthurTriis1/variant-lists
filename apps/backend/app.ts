import { errorHandler } from "@src/plugins/error-handler.plugin";
import { routes } from "@src/plugins/routes.plugin";
import Fastify from "fastify";
import jwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

const app = Fastify();

app.register(fastifyCookie);

app.register(jwt, {
	secret: "supersecret",
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "10m",
	},
});

app.get("/verifycookie", (request, reply) => {
	reply.send({ code: "OK", message: "it works!" });
});

app.register(routes);

app.setErrorHandler(errorHandler);

export { app };
