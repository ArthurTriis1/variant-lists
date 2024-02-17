import CreateSchemaBuilder from "@src/builders/create-schema.builder";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	title: z.string(),
	description: z.string(),
	creatorId: z.string(),
	data: z.record(z.unknown()),
});

export const createSchemaController = async (app: FastifyInstance) => {
	app.post("/schema", async (request, reply) => {
		const body = bodyValidate.parse(request.body);

		const schemaBuilder = new CreateSchemaBuilder();
		const createSchema = schemaBuilder.build();

		const schemaResponse = await createSchema.execute(body);

		reply.send(schemaResponse);
	});
};
