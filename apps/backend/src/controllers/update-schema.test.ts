import { UserPresented } from "@src/presenters/user.presenter";
import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { UniqueEntityID } from "@variant-lists/domain";
import { app } from "app";
import request from "supertest";

let cookie: string;
let user: UserPresented;

describe("Update Schema (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		cookie = response.cookie;
		user = response.user;
	});

	test("[PUT] /schema/:schemaId", async () => {
		const schema = await makePrismaSchema({
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.put("/schema/" + schema.id)
			.set("Cookie", cookie)
			.send({
				data: {
					type: "object",
					properties: {
						name: {
							type: "string",
						},
						age: {
							type: "number",
						},
					},
				},
			})
			.expect(200);
	});
});
