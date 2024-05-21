import FetchlistsByUserBuilder from "@src/builders/fetch-lists-by-user.builder";
import { ListPresenter } from "@src/presenters/list.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const response = {
	200: z.object({
		lists: z.array(
			z.object({
				title: z.string(),
				slug: z.string(),
				description: z.string(),
				schemaId: z.string(),
				creatorId: z.string(),
			}),
		),
	}),
};

export const fetchListsByUserController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().get(
		"/lists",
		{
			schema: {
				response,
			},
		},
		async ({ user }, reply) => {
			const creatorId = user.id;

			const schemaBuilder = new FetchlistsByUserBuilder();
			const fetchlistsByUser = schemaBuilder.build();

			const response = await fetchlistsByUser.execute({
				creatorId,
			});

			const presentedLists = response.lists.map(ListPresenter.toHTTP);

			reply.send({ lists: presentedLists });
		},
	);
};
