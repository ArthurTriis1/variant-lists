import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";

let cookie: string;
let user: UserPresented;

describe("Create List (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[POST] :schemaId/list", async () => {
		const schema = await makePrismaSchema({
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.post(`/${schema.id.toString()}/list`)
			.set("Cookie", cookie)
			.send({
				title: "new list",
				description: "list description",
			})
			.expect(200);
	});
});
