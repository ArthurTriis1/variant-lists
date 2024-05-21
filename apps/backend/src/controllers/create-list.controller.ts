import CreateListBuilder from "@src/builders/create-list.builder";
import { ListPresenter } from "@src/presenters/list.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	title: z.string(),
	description: z.string(),
	schemaId: z.string(),
});

const response = {
	200: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		schemaId: z.string(),
		creatorId: z.string(),
	}),
};

export const createListController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/list",
		{
			schema: {
				body,
				response,
			},
		},
		async ({ body, user }, reply) => {
			const creatorId = user.id;

			const listBuilder = new CreateListBuilder();
			const createList = listBuilder.build();

			const { list } = await createList.execute({ ...body, creatorId });

			reply.send(ListPresenter.toHTTP(list));
		},
	);
};
