import FetchlistsByUserBuilder from "@src/builders/fetch-lists-by-user.builder";
import { FastifyInstance } from "fastify";

export const fetchListsByUserController = async (app: FastifyInstance) => {
	app.get("/lists", async (request, reply) => {
		const creatorId = request.user.id;

		const schemaBuilder = new FetchlistsByUserBuilder();
		const fetchlistsByUser = schemaBuilder.build();

		const schemaResponse = await fetchlistsByUser.execute({
			creatorId,
		});

		reply.send(schemaResponse);
	});
};
