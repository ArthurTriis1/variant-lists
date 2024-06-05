import { makePrismaSchema } from "@test/factories/prisma-schema.factory";
import { getUser } from "@test/getUser";
import { app } from "app";
import request from "supertest";
import { makePrismaList } from "@test/factories/prisma-list.factory";
import { UserPresented } from "@src/presenters/user.presenter";
import { UniqueEntityID } from "@variant-lists/domain";

let cookie: string;
let user: UserPresented;

describe("Fork Schema By List (E2E)", () => {
	beforeAll(async () => {
		await app.ready();

		const response = await getUser(app);
		user = response.user;
		cookie = response.cookie;
	});

	test.skip("[POST] /fork-schema", async () => {
		const schema = await makePrismaSchema({
			creatorUsername: user.username,
		});

		const list = await makePrismaList({
			schemaId: schema.id,
			creatorId: new UniqueEntityID(user.id),
		});

		await request(app.server)
			.post("/fork-schema")
			.set("Cookie", cookie)
			.send({
				listId: list.id.toString(),
				schemaId: schema.id.toString(),
				data: {
					type: "object",
					properties: {
						field: {
							type: "string",
						},
					},
					required: ["field"],
				},
			})
			.expect(201);
	});
});
