import AutenticateUserBuilder from "@src/builders/authenticate.builder";
import { env } from "@src/env";
import { UserPresenter } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

const body = z.object({
	email: z.string().email(),
	password: z.string(),
});

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

			const refreshToken = app.jwt.sign(user, { expiresIn: "1d" });

			const token = app.jwt.sign({
				...user,
			});

			const { HOST, PORT } = env;

			reply
				.setCookie("refreshToken", refreshToken, {
					domain: `${HOST}:${PORT}`,
					path: "/",
					secure: true, // send cookie over HTTPS only
					httpOnly: true,
					sameSite: true, // alternative CSRF protection
				})
				.code(200)
				.send({ token });
		},
	);
};
