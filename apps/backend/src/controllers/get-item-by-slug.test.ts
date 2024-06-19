import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { makePrismaList } from "@test/factories/prisma-list.factory";
import { UserPresented } from "@src/presenters/user.presenter";
import { makePrismaItem } from "@test/factories/prisma-item.factory";

let cookie: string;
let user: UserPresented;

describe("Get item by slug (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[GET] /item/:creatorUsername/:listSlug/:slug", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});

		const item = await makePrismaItem({
			listSlug: list.slug.value,
			creatorUsername: list.creatorUsername,
		});

		await request(app.server)
			.get(`/item/${user.username}/${list.slug.value}/${item.slug.value}`)
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
