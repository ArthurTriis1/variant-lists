import FetchSchemasByUserBuilder from "@src/builders/fetch-schemas-by-user.builder";
import { SchemaPresenter } from "@src/presenters/schema.presenter";
import { FastifyInstance } from "fastify";

export const fetchSchemasByUserController = async (app: FastifyInstance) => {
	app.get("/schemas", async (request, reply) => {
		const creatorId = request.user.id;

		const schemaBuilder = new FetchSchemasByUserBuilder();
		const fetchSchemasByUser = schemaBuilder.build();

		const response = await fetchSchemasByUser.execute({
			creatorId,
		});

		const presentedSchemas = response.schemas.map(SchemaPresenter.toHTTP);

		reply.send({ schemas: presentedSchemas });
	});
};
