import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { makeSchema } from "@test/factories/make-schema";
import { JsonSchemaValidator } from "@src/domain/lists/application/services/json-schema-validator";
import { ForkSchemaByList } from "@src/domain/lists/application/use-cases/fork-schema-by-list";
import { makeList } from "@test/factories/make-list";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { ListNotFoundError } from "@src/core/errors/list-not-found-error";
import { makeUser } from "@test/factories/make-user";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";

let inMemorySchemaRepository: InMemorySchemaRepository;
let inMemoryListRepository: InMemoryListRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let jsonSchemaValidator: JsonSchemaValidator;

let sut: ForkSchemaByList;

describe("Fork Schema", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();
		inMemoryListRepository = new InMemoryListRepository();
		inMemoryUserRepository = new InMemoryUserRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new ForkSchemaByList(
			inMemorySchemaRepository,
			inMemoryListRepository,
			jsonSchemaValidator,
		);
	});

	it("Should fork schema mantening the list reference", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema({ creatorUsername: user.username });
		await inMemorySchemaRepository.create(schema);

		const list = makeList({ schemaId: schema.id, creatorId: user.id });
		await inMemoryListRepository.create(list);

		const data = {
			type: "object",
			properties: {
				field: {
					type: "string",
				},
			},
			required: ["field"],
		};

		await sut.execute({
			listId: list.id.toString(),
			schemaId: schema.id.toString(),
			creatorUsername: user.username,
			data,
		});

		expect(inMemorySchemaRepository.schemas.length).toBe(2);
		expect(inMemorySchemaRepository.schemas[1].data).toMatchObject(data);
		expect(inMemorySchemaRepository.schemas[1].creatorUsername).toEqual(
			user.username,
		);
		expect(inMemoryListRepository.lists[0].schemaId).toEqual(
			inMemorySchemaRepository.schemas[1].id,
		);
	});

	it("Should throw error to invalid schema", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema({ creatorUsername: user.username });
		await inMemorySchemaRepository.create(schema);

		const list = makeList({ schemaId: schema.id, creatorId: user.id });
		await inMemoryListRepository.create(list);

		const data = {};

		expect(
			async () =>
				await sut.execute({
					listId: list.id.toString(),
					schemaId: schema.id.toString(),
					creatorUsername: user.username,
					data,
				}),
		).rejects.toBeInstanceOf(NotValidSchemaError);
	});

	it("Should throw error to not found schema", async () => {
		const schema = makeSchema({});

		const list = makeList({ schemaId: schema.id });
		await inMemoryListRepository.create(list);

		const data = {
			type: "object",
			properties: {
				field: {
					type: "string",
				},
			},
			required: ["field"],
		};

		expect(
			async () =>
				await sut.execute({
					listId: list.id.toString(),
					schemaId: schema.id.toString(),
					creatorUsername: "user_name",
					data,
				}),
		).rejects.toBeInstanceOf(SchemaNotFoundError);
	});

	it("Should throw error to not found list", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema({ creatorUsername: user.username });
		await inMemorySchemaRepository.create(schema);

		const list = makeList({ schemaId: schema.id, creatorId: user.id });

		const data = {
			type: "object",
			properties: {
				field: {
					type: "string",
				},
			},
			required: ["field"],
		};

		expect(
			async () =>
				await sut.execute({
					listId: list.id.toString(),
					schemaId: schema.id.toString(),
					creatorUsername: user.username,
					data,
				}),
		).rejects.toBeInstanceOf(ListNotFoundError);
	});
});

// console.table(
// 	inMemorySchemaRepository.schemas.map((schema) => ({
// 		id: schema.id.toString(),
// 	})),
// );
// console.table(
// 	inMemoryListRepository.lists.map((list) => ({
// 		id: list.id.toString(),
// 		schemaId: list.schemaId.toString(),
// 	})),
// );
