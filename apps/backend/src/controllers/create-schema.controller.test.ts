import { app } from "app";
import request from "supertest";

describe("Pig (E2E)", () => {
	beforeAll(async () => {
		await app.ready();
	});
	test("[POST] /item", async () => {
		await request(app.server)
			.post("/item")
			.send({
				title: "",
				description: "",
				creatorId: "",
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
