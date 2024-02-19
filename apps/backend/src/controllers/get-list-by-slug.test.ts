import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { makePrismaList } from "@test/factories/prisma-list.factory";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";

let cookie: string;
let user: UserPresented;

describe("Get list by slug (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[GET] /list/:slug", async () => {
		const schema = await makePrismaSchema({
			creatorId: new UniqueEntityID(user.id),
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.get("/list/" + list.slug.value)
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
