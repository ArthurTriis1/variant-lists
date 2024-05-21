import ValidateAllItemsFromListBuilder from "@src/builders/validate-all-items-from-list.builder";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const body = z.object({
	listId: z.string(),
});

export const validateAllItemsFromListController = async (
	app: FastifyInstance,
) => {
	app.withTypeProvider<ZodTypeProvider>().put(
		"/validate-all-items",
		{
			schema: {
				body,
				response: {
					201: z.null(),
				},
			},
		},
		async ({ body: { listId }, user }, reply) => {
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
