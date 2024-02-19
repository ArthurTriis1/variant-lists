import UpdateSchemaBuilder from "@src/builders/update-schema.builder";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	data: z.record(z.unknown()).optional(),
	schemaId: z.string(),
});

export const updateSchemaController = async (app: FastifyInstance) => {
	app.put("/schema/:schemaId", async (request, reply) => {
		const creatorId = request.user.id;

		const body = bodyValidate.parse({
			...(request.body as Record<string, unknown>),
			schemaId: (request.params as { schemaId: string })?.schemaId,
		});

		const schemaBuilder = new UpdateSchemaBuilder();
		const updateSchema = schemaBuilder.build();

		const schemaResponse = await updateSchema.execute({
			...body,
			creatorId,
		});

		reply.send(schemaResponse);
	});
};
