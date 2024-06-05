import { UserPresented } from "@src/presenters/user.presenter";
import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
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
			creatorUsername: user.username,
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
			.expect(201);
	});
});
