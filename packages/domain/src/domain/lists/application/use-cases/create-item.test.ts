import { InMemoryItemRepository } from "@test/repositories/in-memory-item-repository";
import { CreateItem } from "@src/domain/lists/application/use-cases/create-item";
import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { makeSchema } from "@test/factories/make-schema";
import { makeList } from "@test/factories/make-list";
import { JsonSchemaValidator } from "@src/domain/lists/application/services/json-schema-validator";
import { ItemMismatchSchema } from "@src/core/errors/item-mismatch-schema-error";
import { NotAllowedError, SlugAlreadyExistsError } from "@src/core/errors";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { makeUser } from "@test/factories/make-user";

let inMemoryItemRepository: InMemoryItemRepository;
let inMemorySchemaRepository: InMemorySchemaRepository;
let inMemoryListRepository: InMemoryListRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let jsonSchemaValidator: JsonSchemaValidator;

let sut: CreateItem;

describe("Create Item", () => {
	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository();
		inMemorySchemaRepository = new InMemorySchemaRepository();
		inMemoryListRepository = new InMemoryListRepository();
		inMemoryUserRepository = new InMemoryUserRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new CreateItem(
			inMemoryItemRepository,
			inMemorySchemaRepository,
			inMemoryListRepository,
			inMemoryUserRepository,
			jsonSchemaValidator,
		);
	});

	it("should create Item", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		const list = makeList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});
		inMemoryListRepository.create(list);

		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "description",
			creatorId: user.id.toString(),
			listId: list.id.toString(),
			data: {
				name: "My Name",
			},
		});

		expect(inMemoryItemRepository.items[0]).toEqual(response?.item);
	});

	it("should throws error if slug already exists", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		const list = makeList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});
		inMemoryListRepository.create(list);

		await sut.execute({
			title: "Primeiro esquema",
			description: "description",
			creatorId: user.id.toString(),
			listId: list.id.toString(),
			data: {
				name: "My Name",
			},
		});

		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "description",
					creatorId: user.id.toString(),
					listId: list.id.toString(),
					data: {
						name: "My Name",
					},
				}),
		).rejects.toBeInstanceOf(SlugAlreadyExistsError);
	});

	it("should throws error if Item dont match with schema", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema({
			creatorUsername: user.username,
			data: {
				type: "object",
				properties: {
					name: {
						type: "string",
					},
				},
				required: ["name"],
			},
		});

		inMemorySchemaRepository.create(schema);

		const list = makeList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});
		inMemoryListRepository.create(list);

		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "description",
					creatorId: user.id.toString(),
					listId: list.id.toString(),
					data: {
						error: "show error",
					},
				}),
		).rejects.toBeInstanceOf(ItemMismatchSchema);
	});

	it("should throws error if creator list does not match", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const user2 = makeUser();
		inMemoryUserRepository.create(user2);

		const schema = makeSchema({
			creatorUsername: user.username,
		});

		inMemorySchemaRepository.create(schema);

		const list = makeList({
			schemaId: schema.id,
			creatorUsername: user.username,
		});
		inMemoryListRepository.create(list);

		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "description",
					creatorId: user2.id.toString(),
					listId: list.id.toString(),
					data: {
						error: "show error",
					},
				}),
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
