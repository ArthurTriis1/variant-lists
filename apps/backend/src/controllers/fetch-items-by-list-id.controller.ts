import FetchItemsByListBuilder from "@src/builders/fetch-items-by-list.builder";
import { ItemPresenter } from "@src/presenters/item.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const params = z.object({
	listId: z.string(),
});

const querystring = z.object({
	page: z.coerce.number().default(1),
});

const response = {
	200: z.object({
		items: z.array(
			z.object({
				title: z.string(),
				slug: z.string(),
				description: z.string(),
				listSlug: z.string(),
				creatorUsername: z.string(),
				imageUrl: z.string().optional(),
				lastValidationDate: z.string(),
				isValid: z.boolean(),
				data: z.record(z.string(), z.unknown()),
			}),
		),
		total: z.number(),
	}),
};

export const fetchItemsByListController = async (
	app: FastifyInstance,
): Promise<void> => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/:listId/items",
		{
			schema: {
				params,
				querystring,
				response,
			},
		},
		async ({ query: { page }, params: { listId }, user }, reply) => {
			const schemaBuilder = new FetchItemsByListBuilder();
			const fetchItemsByList = schemaBuilder.build();

			const response = await fetchItemsByList.execute({
				creatorId: user.id,
				listId,
				page,
			});

			const presentedItems = response.items.map(ItemPresenter.toHTTP);

			reply.send({ items: presentedItems, total: response.total });
		},
	);
};
