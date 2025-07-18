import { errorHandler } from "@src/plugins/error-handler.plugin";
import { routes } from "@src/routes";
import Fastify from "fastify";
import jwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { env } from "@src/env";

const app = Fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCookie);

app.register(jwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: env.JWT_EXPIRES_IN,
	},
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Variant Lists",
			description: "Sample backend service",
			version: "1.0.0",
		},
		servers: [],
	},
	transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
	routePrefix: "/documentation",
});

app.register(routes);

app.setErrorHandler(errorHandler);

export { app };
