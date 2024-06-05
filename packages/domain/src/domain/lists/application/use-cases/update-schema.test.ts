import { makeSchema } from "@test/factories/make-schema";
import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { UpdateSchema } from "@src/domain/lists/application/use-cases/update-schema";
import { JsonSchemaValidator } from "@src/domain/lists/application/services/json-schema-validator";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";

let sut: UpdateSchema;

let inMemorySchemaRepository: InMemorySchemaRepository;
let jsonSchemaValidator: JsonSchemaValidator;

describe("Update user", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new UpdateSchema(inMemorySchemaRepository, jsonSchemaValidator);
	});

	it("should update schema values", async () => {
		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		const newTitle = "new title";
		const newDescription = "new description";
		const newData = {
			type: "object",
			properties: {
				name: { type: "string" },
				age: { type: "number" },
			},
		};

		await sut.execute({
			title: newTitle,
			description: newDescription,
			data: newData,
			creatorUsername: schema.creatorUsername,
			schemaId: schema.id.toString(),
		});

		const { data, title, description } =
			inMemorySchemaRepository.schemas[0];

		expect(title).toEqual(newTitle);
		expect(description).toEqual(newDescription);
		expect(data).toMatchObject(data);
	});

	it("should throws error if the schema is not found", async () => {
		const schema = makeSchema();

		const newTitle = "new title";

		expect(async () => {
			await sut.execute({
				title: newTitle,
				creatorUsername: schema.creatorUsername,
				schemaId: schema.id.toString(),
			});
		}).rejects.toBeInstanceOf(SchemaNotFoundError);
	});

	it("should throws error if the schema is not valid", async () => {
		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		expect(async () => {
			await sut.execute({
				creatorUsername: schema.creatorUsername,
				schemaId: schema.id.toString(),
				data: {},
			});
		}).rejects.toBeInstanceOf(NotValidSchemaError);
	});

	it("should throws error if the user is not the creator", async () => {
		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		expect(async () => {
			await sut.execute({
				creatorUsername: "XXX",
				schemaId: schema.id.toString(),
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});

	it("should update last update schema date", async () => {
		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		const creationDate = schema.lastUpdateSchemaDate;

		const newData = {
			type: "object",
			properties: {
				name: { type: "string" },
				age: { type: "number" },
			},
		};

		await sut.execute({
			data: newData,
			creatorUsername: schema.creatorUsername,
			schemaId: schema.id.toString(),
		});

		const { lastUpdateSchemaDate } = inMemorySchemaRepository.schemas[0];

		expect(lastUpdateSchemaDate > creationDate).toBeTruthy();
	});
});
