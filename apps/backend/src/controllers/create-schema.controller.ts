import { createSchemaUseCaseFactory } from "@src/factories/create-schema-use-case-factory";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	title: z.string(),
	description: z.string(),
	creatorId: z.string(),
	data: z.record(z.unknown()),
});

export const createItemController = async (app: FastifyInstance) => {
	app.post("/item", async (request, reply) => {
		const body = bodyValidate.parse(request.body);

		const createSchemaUseCase = createSchemaUseCaseFactory();

		const schemaResponse = await createSchemaUseCase.execute(body);

		reply.send(schemaResponse);
	});
};
