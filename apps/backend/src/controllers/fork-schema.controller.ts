import ForkSchemaByListBuilder from "@src/builders/fork-schema.builder";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	listId: z.string(),
	schemaId: z.string(),
	data: z.record(z.unknown()),
});

export const forkSchemaByListController = async (app: FastifyInstance) => {
	app.post("/fork-schema", async (request, reply) => {
		const creatorId = request.user.id;

		const body = bodyValidate.parse(request.body);

		const schemaBuilder = new ForkSchemaByListBuilder();
		const forkSchemaByList = schemaBuilder.build();

		await forkSchemaByList.execute({
			...body,
			creatorId,
		});

		reply.code(201).send();
	});
};
