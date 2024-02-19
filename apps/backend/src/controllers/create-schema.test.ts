import { UserPresented } from "@src/presenters/user.presenter";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";

let cookie: string;
let user: UserPresented;

describe("Create Schema (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test("[POST] /schema", async () => {
		await request(app.server)
			.post("/schema")
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
