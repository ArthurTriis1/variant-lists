import CreateItemBuilder from "@src/builders/create-item.builder";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	title: z.string(),
	description: z.string(),
	listId: z.string(),
	data: z.record(z.unknown()),
});

export const createItemController = async (app: FastifyInstance) => {
	app.post("/item", async (request, reply) => {
		const creatorId = request.user.id;

		const body = bodyValidate.parse(request.body);

		const itemBuilder = new CreateItemBuilder();
		const createItem = itemBuilder.build();

		const itemResponse = await createItem.execute({ ...body, creatorId });

		reply.send(itemResponse);
	});
};
