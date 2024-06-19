import { makePrismaItem } from "@test/factories/prisma-item.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";
import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { makePrismaList } from "@test/factories/prisma-list.factory";

let cookie: string;
let user: UserPresented;

describe("Get items by user (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[GET] /:listId/items", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});

		await makePrismaItem({
			listSlug: list.slug.value,
			creatorUsername: user.username,
		});

		await request(app.server)
			.get(`/${list.id.toString()}/items`)
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
