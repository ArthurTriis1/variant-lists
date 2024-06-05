import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";

let cookie: string;
let user: UserPresented;

describe("Get schemas by user (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[GET] /schemas", async () => {
		await makePrismaSchema({
			creatorUsername: user.username,
		});

		await request(app.server)
			.get("/schemas")
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
