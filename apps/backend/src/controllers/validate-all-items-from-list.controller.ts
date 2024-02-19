import ValidateAllItemsFromListBuilder from "@src/builders/validate-all-items-from-list.builder";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodyValidate = z.object({
	listId: z.string(),
});

export const validateAllItemsFromListController = async (
	app: FastifyInstance,
) => {
	app.put("/validate-all-items", async (request, reply) => {
		const creatorId = request.user.id;
		const { listId } = bodyValidate.parse(request.body);

		const validateAllItemsFromListBuilder =
			new ValidateAllItemsFromListBuilder();
		const validateAllItemsFromList =
			validateAllItemsFromListBuilder.build();

		await validateAllItemsFromList.execute({
			listId,
			creatorId,
		});

		reply.code(201).send();
	});
};
