import { makePrismaUser } from "@test/factories/make-prisma-user";
import { app } from "app";
import request from "supertest";

describe("Pig (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	test("[POST] /item", async () => {
		const user = await makePrismaUser();

		await request(app.server)
			.post("/item")
			.send({
				title: "new item",
				description: "A new item",
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
