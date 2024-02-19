import GetListBySlugBuilder from "@src/builders/get-list-by-slug.builder";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodyValidate = z.object({
	slug: z.string(),
});

export const getListBySlugController = async (app: FastifyInstance) => {
	app.get("/list/:slug", async (request, reply) => {
		const creatorId = request.user.id;
		const { slug } = bodyValidate.parse(request.params);

		const getListBySlugBuilder = new GetListBySlugBuilder();
		const getListBySlug = getListBySlugBuilder.build();

		const listResponse = await getListBySlug.execute({
			slug,
			creatorId,
		});

		reply.send(listResponse);
	});
};
