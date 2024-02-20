import FetchItemsByListBuilder from "@src/builders/fetch-items-by-list.builder";
import { ItemPresenter } from "@src/presenters/item.presenter";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodyValidate = z.object({
	listId: z.string(),
	page: z.coerce.number().default(1),
});

export const fetchItemsByListController = async (
	app: FastifyInstance,
): Promise<void> => {
	app.get("/items/:listId", async (request, reply) => {
		const creatorId = request.user.id;

		const { listId, page } = bodyValidate.parse({
			...(request.params as Record<string, unknown>),
			...(request.query as Record<string, unknown>),
		});

		const schemaBuilder = new FetchItemsByListBuilder();
		const fetchItemsByList = schemaBuilder.build();

		const response = await fetchItemsByList.execute({
			creatorId,
			listId,
			page,
		});

		const presentedItems = response.items.map(ItemPresenter.toHTTP);

		reply.send({ items: presentedItems, total: response.total });
	});
};
