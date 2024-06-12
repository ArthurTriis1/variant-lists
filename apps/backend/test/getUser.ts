import { UserPresented } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import request from "supertest";

const userDefault = {
	name: "user name",
	username: "user_name",
	email: "user@user.com",
	password: "123456",
};

export const getUser = async (
	app: FastifyInstance,
	user: Partial<typeof userDefault> = {},
) => {
	const responseUser = await request(app.server)
		.post("/sign-up")
		.send({
			...userDefault,
			...user,
		});

	const response = await request(app.server)
		.post("/sign-in")
		.send({
			email: user.email ?? userDefault.email,
			password: user.password ?? userDefault.password,
		});

	return {
		cookie: response.headers["set-cookie"],
		user: responseUser.body as UserPresented,
	};
};
