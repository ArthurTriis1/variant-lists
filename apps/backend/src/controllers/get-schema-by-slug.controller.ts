import GetSchemaBySlugBuilder from "@src/builders/get-schema-by-slug.builder";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodyValidate = z.object({
	slug: z.string(),
});

export const getSchemaBySlugController = async (app: FastifyInstance) => {
	app.get("/schema/:slug", async (request, reply) => {
		const creatorId = request.user.id;
		const { slug } = bodyValidate.parse(request.params);

		const getSchemaBySlugBuilder = new GetSchemaBySlugBuilder();
		const getSchemaBySlug = getSchemaBySlugBuilder.build();

		const schemaResponse = await getSchemaBySlug.execute({
			slug,
			creatorId,
		});

		reply.send(schemaResponse);
	});
};
