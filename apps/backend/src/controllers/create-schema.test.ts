import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";

let cookie: string;
let cookie2: string;

describe("Create Schema (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		cookie = response.cookie;

		const response2 = await getUser(app, {
			name: "user name 2",
			username: "user_name_2",
			email: "user2@user.com",
		});
		cookie2 = response2.cookie;
	});

	test("[POST] /schema", async () => {
		await request(app.server)
			.post("/schema")
			.set("Cookie", cookie)
			.send({
				title: "new schema",
				description: "A new achema",
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

	test("[POST] /schema with same name and by different author should be created", async () => {
		await request(app.server)
			.post("/schema")
			.set("Cookie", cookie)
			.send({
				title: "new schema with same name",
				description: "A new achema",
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

		await request(app.server)
			.post("/schema")
			.set("Cookie", cookie2)
			.send({
				title: "new schema with same name",
				description: "A new achema",
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

	test("[POST] /schema with same name and author should broke", async () => {
		await request(app.server)
			.post("/schema")
			.set("Cookie", cookie)
			.send({
				title: "new schema with same name 2",
				description: "A new achema",
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

		await request(app.server)
			.post("/schema")
			.set("Cookie", cookie)
			.send({
				title: "new schema with same name 2",
				description: "A new achema",
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
			.expect(400);
	});
});
