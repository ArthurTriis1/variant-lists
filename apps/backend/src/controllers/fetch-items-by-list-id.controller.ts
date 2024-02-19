import FetchItemsByListBuilder from "@src/builders/fetch-items-by-list.builder";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodyValidate = z.object({
	listId: z.string(),
	page: z.coerce.number().default(0),
});

export const fetchItemsByListController = async (app: FastifyInstance) => {
	app.get("/items/:listId", async (request, reply) => {
		const creatorId = request.user.id;

		const { listId, page } = bodyValidate.parse({
			...(request.params as Record<string, unknown>),
			...(request.query as Record<string, unknown>),
		});

		const schemaBuilder = new FetchItemsByListBuilder();
		const fetchItemsByList = schemaBuilder.build();

		const schemaResponse = await fetchItemsByList.execute({
			creatorId,
			listId,
			page,
		});

		reply.send(schemaResponse);
	});
};
