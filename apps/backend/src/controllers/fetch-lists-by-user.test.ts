import { makePrismaList } from "@test/factories/prisma-list.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";
import { makePrismaSchema } from "@test/factories/prisma-schema.factory";

let cookie: string;
let user: UserPresented;

describe("Get list by slug (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[GET] /lists", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		await makePrismaList({
			creatorId: new UniqueEntityID(user.id),
			schemaId: schema.id,
		});

		await request(app.server)
			.get("/lists")
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
