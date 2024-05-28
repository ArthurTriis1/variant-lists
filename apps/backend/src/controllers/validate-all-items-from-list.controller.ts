import ValidateAllItemsFromListBuilder from "@src/builders/validate-all-items-from-list.builder";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const params = z.object({
	listId: z.string(),
});

export const validateAllItemsFromListController = async (
	app: FastifyInstance,
) => {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/:listId/validate-all-items",
		{
			schema: {
				params,
				response: {
					201: z.null(),
				},
			},
		},
		async ({ params: { listId }, user }, reply) => {
			const creatorId = user.id;

			const validateAllItemsFromListBuilder =
				new ValidateAllItemsFromListBuilder();
			const validateAllItemsFromList =
				validateAllItemsFromListBuilder.build();

			await validateAllItemsFromList.execute({
				listId,
				creatorId,
			});

			reply.code(201).send();
		},
	);
};
