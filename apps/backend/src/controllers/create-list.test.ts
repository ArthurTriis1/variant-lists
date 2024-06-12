import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";

let cookie: string;
let user: UserPresented;

// let cookie2: string;
// let user2: UserPresented;

describe("Create List (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;

		// const response2 = await getUser(app, {
		// 	name: "user name 2",
		// 	username: "user_name_2",
		// 	email: "user2@user.com",
		// });
		// user2 = response2.user;
		// cookie2 = response2.cookie;
	});

	test("[POST] :schemaId/list", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		await request(app.server)
			.post(`/${schema.id.toString()}/list`)
			.set("Cookie", cookie)
			.send({
				title: "new list",
				description: "list description",
			})
			.expect(200);
	});

	test("[POST] :schemaId/list with same title and same author should broke", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		await request(app.server)
			.post(`/${schema.id.toString()}/list`)
			.set("Cookie", cookie)
			.send({
				title: "new list 2",
				description: "list description",
			})
			.expect(200);

		await request(app.server)
			.post(`/${schema.id.toString()}/list`)
			.set("Cookie", cookie)
			.send({
				title: "new list 2",
				description: "list description",
			})
			.expect(400);
	});
});
