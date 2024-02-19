import FetchSchemasByUserBuilder from "@src/builders/fetch-schemas-by-user.builder";
import { FastifyInstance } from "fastify";

export const fetchSchemasByUserController = async (app: FastifyInstance) => {
	app.get("/schemas", async (request, reply) => {
		const creatorId = request.user.id;

		const schemaBuilder = new FetchSchemasByUserBuilder();
		const fetchSchemasByUser = schemaBuilder.build();

		const schemaResponse = await fetchSchemasByUser.execute({
			creatorId,
		});

		reply.send(schemaResponse);
	});
};
