import AutenticateUserBuilder from "@src/builders/authenticate.builder";
import { UserPresenter } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import z from "zod";

const bodyValidate = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const autenticateUserController = async (app: FastifyInstance) => {
	app.post("/sign-in", async (request, reply) => {
		const body = bodyValidate.parse(request.body);

		const schemaBuilder = new AutenticateUserBuilder();
		const autenticateUser = schemaBuilder.build();

		const autenticateUserResponse = await autenticateUser.execute(body);

		const user = UserPresenter.toHTTP(autenticateUserResponse.user);

		const refreshToken = app.jwt.sign(user, { expiresIn: "1d" });

		const token = app.jwt.sign({
			user,
		});

		reply
			.setCookie("refreshToken", refreshToken, {
				domain: "localhost",
				path: "/",
				secure: true, // send cookie over HTTPS only
				httpOnly: true,
				sameSite: true, // alternative CSRF protection
			})
			.code(200)
			.send({ token });

		reply.send({ user });
	});
};
