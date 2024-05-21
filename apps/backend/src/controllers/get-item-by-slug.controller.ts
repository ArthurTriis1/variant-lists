import GetItemBySlugBuilder from "@src/builders/get-item-by-slug.builder";
import { ItemPresenter } from "@src/presenters/item.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const params = z.object({
	slug: z.string(),
});

const response = {
	200: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		listId: z.string(),
		creatorId: z.string(),
		imageUrl: z.string().optional(),
		lastValidationDate: z.string(),
		isValid: z.boolean(),
		data: z.record(z.string(), z.unknown()),
	}),
};

export const getItemBySlugController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/item/:slug",
		{
			schema: {
				params,
				response,
			},
		},
		async ({ params: { slug }, user }, reply) => {
			const creatorId = user.id;

			const getItemBySlugBuilder = new GetItemBySlugBuilder();
			const getItemBySlug = getItemBySlugBuilder.build();

			const response = await getItemBySlug.execute({
				slug,
				creatorId,
			});

			reply.send(ItemPresenter.toHTTP(response.item));
		},
	);
};
