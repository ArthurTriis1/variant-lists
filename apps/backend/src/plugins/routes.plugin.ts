import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createSchemaController } from "@src/controllers/create-schema.controller";
import { registerUserController } from "@src/controllers/register-user.controller";
import { autenticateUserController } from "@src/controllers/autenticate-user.controller";
import { createItemController } from "@src/controllers/create-item.controller";
import { createListController } from "@src/controllers/create-list.controller";
import { forkSchemaByListController } from "@src/controllers/fork-schema.controller";

const authenticatedRoutes = (
	app: FastifyInstance,
	options: FastifyPluginOptions,
	done: () => void,
) => {
	app.addHook("onRequest", (request) =>
		request.jwtVerify({ onlyCookie: true }),
	);

	app.register(createSchemaController);
	app.register(createItemController);
	app.register(createListController);
	app.register(forkSchemaByListController);

	done();
};

const unauthenticatedRoutes = (
	app: FastifyInstance,
	options: FastifyPluginOptions,
	done: () => void,
) => {
	app.register(registerUserController);
	app.register(autenticateUserController);

	done();
};

export const routes = (
	app: FastifyInstance,
	options: FastifyPluginOptions,
	done: () => void,
) => {
	app.register(unauthenticatedRoutes);
	app.register(authenticatedRoutes);

	done();
};
