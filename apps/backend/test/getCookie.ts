import { FastifyInstance } from "fastify";
import request from "supertest";

export const getCookie = async (app: FastifyInstance) => {
	await request(app.server).post("/sign-up").send({
		name: "user name",
		email: "user@user.com",
		password: "123456",
	});

	const response = await request(app.server).post("/sign-in").send({
		email: "user@user.com",
		password: "123456",
	});

	return response.headers["set-cookie"];
};
