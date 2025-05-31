import AutenticateUserBuilder from "@src/builders/authenticate.builder";
import { env } from "@src/env";
import { UserPresenter } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z
	.object({
		email: z.string().optional(),
		username: z.string().optional(),
		password: z.string(),
	})
	.and(
		z.union([
			z.object({
				email: z.string(),
			}),
			z.object({
				username: z.string(),
			}),
		]),
	);

const response = {
	200: z.object({
		token: z.string(),
	}),
};

export const autenticateUserController = async (app: FastifyInstance) => {
	app.withTypeProvider<ZodTypeProvider>().post(
		"/sign-in",
		{
			schema: {
				body,
				response,
			},
		},
		async ({ body }, reply) => {
			const schemaBuilder = new AutenticateUserBuilder();
			const autenticateUser = schemaBuilder.build();

			const autenticateUserResponse = await autenticateUser.execute(body);

			const user = UserPresenter.toHTTP(autenticateUserResponse.user);

			const refreshToken = app.jwt.sign(user, { 
				expiresIn: env.JWT_REFRESH_EXPIRES_IN
			});

			const token = app.jwt.sign(user, {
				expiresIn: env.JWT_EXPIRES_IN
			});

			const { HOST, PORT } = env;

			reply
				.setCookie("refreshToken", refreshToken, {
					domain: `${HOST}:${PORT}`,
					path: "/",
					secure: true,
					httpOnly: true,
					sameSite: true,
				})
				.code(200)
				.send({ token });
		},
	);
};
