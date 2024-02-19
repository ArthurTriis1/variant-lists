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

	test("[PUT] /validate-all-items", async () => {
		const schema = await makePrismaSchema({
			creatorId: new UniqueEntityID(user.id),
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
			.put("/validate-all-items")
			.set("Cookie", cookie)
			.send({
				listId: list.id.toString(),
			})
			.expect(201);
	});
});