import CreateItemBuilder from "@src/builders/create-item.builder";
import { ItemPresenter } from "@src/presenters/item.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	title: z.string(),
	description: z.string(),
	data: z.record(z.unknown()),
});

const params = z.object({
	listId: z.string(),
});

const response = {
	200: z.object({
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
};

export const createItemController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/:listId/item",
		{
			schema: {
				body,
				response,
				params,
			},
		},
		async ({ body, user, params: { listId } }, reply) => {
			const creatorId = user.id;

			const itemBuilder = new CreateItemBuilder();
			const createItem = itemBuilder.build();

			const { item } = await createItem.execute({
				...body,
				listId,
				creatorId,
			});

			reply.send(ItemPresenter.toHTTP(item));
		},
	);
};
