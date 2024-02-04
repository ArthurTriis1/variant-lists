import { InMemoryItemRepository } from "test/repositories/in-memory-item-repository";
import { CreateItemUseCase } from "./create-item-use-case";
import { InMemorySchemaRepository } from "test/repositories/in-memory-schema-repository";
import { InMemoryListRepository } from "test/repositories/in-memory-list-repository";
import { makeSchema } from "test/factories/make-schema";
import { makeList } from "test/factories/make-list";
import { JsonSchemaValidator } from "../services/json-schema-validator";
import { ItemMismatchSchema } from "@src/core/errors/errors/item-mismatch-schema-error";

let inMemoryItemRepository: InMemoryItemRepository;
let inMemorySchemaRepository: InMemorySchemaRepository;
let inMemoryListRepository: InMemoryListRepository;
let jsonSchemaValidator: JsonSchemaValidator;

let sut: CreateItemUseCase;

describe("Comment on Item", () => {
	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository();
		inMemorySchemaRepository = new InMemorySchemaRepository();
		inMemoryListRepository = new InMemoryListRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new CreateItemUseCase(
			inMemoryItemRepository,
			inMemorySchemaRepository,
			inMemoryListRepository,
			jsonSchemaValidator,
		);
	});

	it("should create Item", async () => {
		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		const list = makeList({ schemaId: schema.id });
		inMemoryListRepository.create(list);

		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "description",
			creatorId: "1",
			listId: list.id.toString(),
			data: {
				name: "My Name",
			},
		});

		expect(inMemoryItemRepository.items[0]).toEqual(response?.item);
	});

	it("should throws error if Item dont match with schema", async () => {
		const schema = makeSchema({
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

		const list = makeList({ schemaId: schema.id });
		inMemoryListRepository.create(list);

		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "description",
					creatorId: "1",
					listId: list.id.toString(),
					data: {
						error: "show error",
					},
				}),
		).rejects.toBeInstanceOf(ItemMismatchSchema);
	});
});
