import { UserPresented } from "@src/presenters/user.presenter";
import { FastifyInstance } from "fastify";
import request from "supertest";

export const getUser = async (app: FastifyInstance) => {
	const responseUser = await request(app.server).post("/sign-up").send({
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
		user: responseUser.body as UserPresented,
	};
};
