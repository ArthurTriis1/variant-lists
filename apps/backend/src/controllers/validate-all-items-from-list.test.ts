import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { makePrismaList } from "@test/factories/prisma-list.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";
import { makePrismaItem } from "@test/factories/prisma-item.factory";

let cookie: string;
let user: UserPresented;

describe("Get schema by slug (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[PUT] /listId/validate-all-items", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});

		await makePrismaItem({
			listId: list.id,
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.put(`/${list.id.toString()}/validate-all-items`)
			.set("Cookie", cookie)
			.send()
			.expect(201);
	});
});
