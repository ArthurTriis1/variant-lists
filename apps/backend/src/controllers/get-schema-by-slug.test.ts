import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";

let cookie: string;
let user: UserPresented;

describe("Get schema by slug (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[GET] /:creatorUsername/schema/:slug", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		await request(app.server)
			.get(`/${user.username}/schema/${schema.slug.value}`)
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
