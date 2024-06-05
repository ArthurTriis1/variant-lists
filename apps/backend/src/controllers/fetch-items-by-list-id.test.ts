import { makePrismaItem } from "@test/factories/prisma-item.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";
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
			creatorId: new UniqueEntityID(user.id),
		});

		await makePrismaItem({
			listId: list.id,
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.get(`/${list.id.toString()}/items`)
			.set("Cookie", cookie)
			.send()
			.expect(200);
	});
});
