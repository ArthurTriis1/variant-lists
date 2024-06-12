import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { makePrismaList } from "@test/factories/prisma-list.factory";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";

let cookie: string;
let user: UserPresented;

describe("Create Item (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[POST] /:listId/item", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: "user_name",
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});

		await request(app.server)
			.post(`/${list.id.toString()}/item`)
			.set("Cookie", cookie)
			.send({
				title: "new item",
				description: "description",
				data: {
					name: "My Name",
				},
			})
			.expect(200);
	});
});
