import { makePrismaUser } from "@test/factories/prisma-user.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";

let cookie: string;

describe("Create Item (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		cookie = (await getUser(app)).cookie;
	});

	test("[POST] /schema", async () => {
		const user = await makePrismaUser();
		const schema = await makePrismaSchema();
		const list = await makePrismaList();

		await request(app.server)
			.post("/item")
			.set("Cookie", cookie)
			.send({
				title: "new schema",
				description: "A new achema",
				creatorId: user.id.toString(),
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
