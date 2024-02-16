import { makePrismaUser } from "@test/factories/make-prisma-user";
import { app } from "app";
import request from "supertest";

describe("Create Schema (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	test("[POST] /schema", async () => {
		const user = await makePrismaUser();

		await request(app.server)
			.post("/schema")
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
