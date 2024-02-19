import GetItemBySlugBuilder from "@src/builders/get-item-by-slug.builder";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodyValidate = z.object({
	slug: z.string(),
});

export const getItemBySlugController = async (app: FastifyInstance) => {
	app.get("/item/:slug", async (request, reply) => {
		const creatorId = request.user.id;
		const { slug } = bodyValidate.parse(request.params);

		console.log(slug);

		const getItemBySlugBuilder = new GetItemBySlugBuilder();
		const getItemBySlug = getItemBySlugBuilder.build();

		const schemaResponse = await getItemBySlug.execute({
			slug,
			creatorId,
		});

		reply.send(schemaResponse);
	});
};
