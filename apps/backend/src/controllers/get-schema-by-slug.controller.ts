import GetSchemaBySlugBuilder from "@src/builders/get-schema-by-slug.builder";
import { SchemaPresenter } from "@src/presenters/schema.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const params = z.object({
	slug: z.string(),
	creatorUsername: z.string(),
});

const response = {
	200: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		creatorUsername: z.string(),
		data: z.record(z.string(), z.unknown()),
		lastUpdateSchemaDate: z.string(),
	}),
};

export const getSchemaBySlugController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/:creatorUsername/schema/:slug",
		{
			schema: {
				params,
				response,
			},
		},
		async ({ params: { slug, creatorUsername }, user }, reply) => {
			const userId = user.id;

			const getSchemaBySlugBuilder = new GetSchemaBySlugBuilder();
			const getSchemaBySlug = getSchemaBySlugBuilder.build();

			const response = await getSchemaBySlug.execute({
				slug,
				creatorUsername,
				userId,
			});

			reply.send(SchemaPresenter.toHTTP(response.schema));
		},
	);
};
