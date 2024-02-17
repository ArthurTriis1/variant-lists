import RegisterUserBuilder from "@src/builders/register-user.builder";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export const registerUserController = async (app: FastifyInstance) => {
	app.post("/sign-up", async (request, reply) => {
		const body = bodyValidate.parse(request.body);

		const schemaBuilder = new RegisterUserBuilder();
		const registerUser = schemaBuilder.build();

		const schemaResponse = await registerUser.execute(body);

		reply.send(schemaResponse);
	});
};
