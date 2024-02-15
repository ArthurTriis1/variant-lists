import { createItemController } from "@src/controllers/create-schema.controller";
import { UseCaseError } from "@variant-lists/domain";
import Fastify from "fastify";
import { ZodError } from "zod";

const app = Fastify();

app.register(createItemController);

app.setErrorHandler(function (error, request, reply) {
	if (error instanceof ZodError) {
		reply.code(400).send({ errors: error.formErrors.fieldErrors });
		return;
	}

	if (error instanceof UseCaseError) {
		reply.code(400).send({ error: error.message });
		return;
	}

	console.error(error);

	reply.send(error);
});

export { app };
