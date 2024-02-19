import { errorHandler } from "@src/plugins/error-handler.plugin";
import { routes } from "@src/routes";
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

app.register(routes);

app.setErrorHandler(errorHandler);

export { app };
