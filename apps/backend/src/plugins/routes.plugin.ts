import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createSchemaController } from "@src/controllers/create-schema.controller";
import { registerUserController } from "@src/controllers/register-user.controller";

export const routes = (
	app: FastifyInstance,
	options: FastifyPluginOptions,
	done: () => void,
) => {
	app.register(createSchemaController);
	app.register(registerUserController);

	done();
};
