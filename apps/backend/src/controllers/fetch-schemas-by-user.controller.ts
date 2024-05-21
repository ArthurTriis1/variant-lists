import FetchSchemasByUserBuilder from "@src/builders/fetch-schemas-by-user.builder";
import { SchemaPresenter } from "@src/presenters/schema.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const response = {
	200: z.object({
		schemas: z.array(
			z.object({
				title: z.string(),
				slug: z.string(),
				description: z.string(),
				creatorId: z.string(),
				data: z.record(z.string(), z.unknown()),
				lastUpdateSchemaDate: z.string(),
			}),
		),
	}),
};

export const fetchSchemasByUserController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/schemas",
		{
			schema: {
				response,
			},
		},
		async (request, reply) => {
			const creatorId = request.user.id;

			const schemaBuilder = new FetchSchemasByUserBuilder();
			const fetchSchemasByUser = schemaBuilder.build();

			const response = await fetchSchemasByUser.execute({
				creatorId,
			});

			const presentedSchemas = response.schemas.map(
				SchemaPresenter.toHTTP,
			);

			reply.send({ schemas: presentedSchemas });
		},
	);
};
