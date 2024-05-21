import UpdateSchemaBuilder from "@src/builders/update-schema.builder";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	data: z.record(z.unknown()).optional(),
});

const params = z.object({
	schemaId: z.string(),
});

export const updateSchemaController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/schema/:schemaId",
		{
			schema: {
				body,
				params,
				response: {
					201: z.null(),
				},
			},
		},
		async ({ body, params: { schemaId }, user }, reply) => {
			const creatorId = user.id;

			const schemaBuilder = new UpdateSchemaBuilder();
			const updateSchema = schemaBuilder.build();

			await updateSchema.execute({
				...body,
				schemaId,
				creatorId,
			});

			reply.code(201).send();
		},
	);
};
