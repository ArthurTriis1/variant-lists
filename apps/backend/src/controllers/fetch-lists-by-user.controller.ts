import FetchlistsByUserBuilder from "@src/builders/fetch-lists-by-user.builder";
import { ListPresenter } from "@src/presenters/list.presenter";
import { FastifyInstance } from "fastify";

export const fetchListsByUserController = async (app: FastifyInstance) => {
	app.get("/lists", async (request, reply) => {
		const creatorId = request.user.id;

		const schemaBuilder = new FetchlistsByUserBuilder();
		const fetchlistsByUser = schemaBuilder.build();

		const response = await fetchlistsByUser.execute({
			creatorId,
		});

		const presentedLists = response.lists.map(ListPresenter.toHTTP);

		reply.send({ lists: presentedLists });
	});
};
