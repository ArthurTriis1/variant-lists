import CreateSchemaBuilder from "@src/builders/create-schema.builder";
import { SchemaPresenter } from "@src/presenters/schema.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	title: z.string(),
	description: z.string(),
	data: z.record(z.unknown()),
});

const response = {
	200: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		creatorId: z.string(),
		data: z.record(z.string(), z.unknown()),
		lastUpdateSchemaDate: z.string(),
	}),
};

export const createSchemaController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/schema",
		{
			schema: {
				body,
				response,
			},
		},
		async ({ body, user }, reply) => {
			const creatorId = user.id;

			const schemaBuilder = new CreateSchemaBuilder();
			const createSchema = schemaBuilder.build();

			const { schema } = await createSchema.execute({
				...body,
				creatorId,
			});

			reply.send(SchemaPresenter.toHTTP(schema));
		},
	);
};
