import { app } from "app";
import request from "supertest";

describe("Autenticate user (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	test("[POST] /sign-up", async () => {
		await request(app.server).post("/sign-up").send({
			name: "user name",
			username: "user_name",
			email: "user@user.com",
			password: "123456",
		});

		await request(app.server)
			.post("/sign-in")
			.send({
				email: "user@user.com",
				password: "123456",
			})
			.expect(200);

		await request(app.server)
			.post("/sign-in")
			.send({
				username: "user_name",
				password: "123456",
			})
			.expect(200);
	});
});
