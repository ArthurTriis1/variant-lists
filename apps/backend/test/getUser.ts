import { UserPresenter } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import request from "supertest";

export const getUser = async (app: FastifyInstance) => {
	const user = await request(app.server).post("/sign-up").send({
		name: "user name",
		email: "user@user.com",
		password: "123456",
	});

	const response = await request(app.server).post("/sign-in").send({
		email: "user@user.com",
		password: "123456",
	});

	return {
		cookie: response.headers["set-cookie"],
		user: user.body as UserPresenter,
	};
};
