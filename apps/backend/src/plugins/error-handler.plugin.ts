import { UseCaseError } from "@variant-lists/domain";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export const errorHandler = (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	if (error instanceof ZodError) {
		reply.code(400).send({ errors: error.formErrors.fieldErrors });
		return;
	}

	if (error instanceof UseCaseError) {
		reply.code(400).send({ error: error.message });
		return;
	}

	// console.error(error);

	reply.send(error);
};
