import { app } from "app";
import request from "supertest";

describe("Register user (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	test("[POST] /sign-up", async () => {
		await request(app.server)
			.post("/sign-up")
			.send({
				name: "user name",
				username: "user_name",
				email: "user@user.com",
				password: "123456",
			})
			.expect(200);
	});

	test("should throws with the same email", async () => {
		await request(app.server).post("/sign-up").send({
			name: "user name",
			username: "user_name",
			email: "user@user2.com",
			password: "123456",
		});

		await request(app.server)
			.post("/sign-up")
			.send({
				name: "user name",
				username: "user_name",
				email: "user@user2.com",
				password: "123456",
			})
			.expect(400);
	});
});
