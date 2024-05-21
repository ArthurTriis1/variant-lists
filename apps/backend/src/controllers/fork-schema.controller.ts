import ForkSchemaByListBuilder from "@src/builders/fork-schema.builder";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	listId: z.string(),
	schemaId: z.string(),
	data: z.record(z.unknown()),
});

export const forkSchemaByListController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/fork-schema",
		{
			schema: {
				body,
				response: {
					201: z.null(),
				},
			},
		},
		async ({ body, user }, reply) => {
			const creatorId = user.id;

			const schemaBuilder = new ForkSchemaByListBuilder();
			const forkSchemaByList = schemaBuilder.build();

			await forkSchemaByList.execute({
				...body,
				creatorId,
			});

			reply.code(201).send();
		},
	);
};
