import RegisterUserBuilder from "@src/builders/register-user.builder";
import { UserPresenter } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
});

const response = {
	200: z.object({
		id: z.string(),
		name: z.string(),
	}),
};

export const registerUserController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/sign-up",
		{ schema: { body, response } },
		async ({ body }, reply) => {
			const schemaBuilder = new RegisterUserBuilder();
			const registerUser = schemaBuilder.build();

			const schemaResponse = await registerUser.execute(body);

			reply.send(UserPresenter.toHTTP(schemaResponse.user));
		},
	);
};
