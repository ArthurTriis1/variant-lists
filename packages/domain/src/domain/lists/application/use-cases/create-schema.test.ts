import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { CreateSchema } from "@src/domain/lists/application/use-cases/create-schema";
import { JsonSchemaValidator } from "@src/domain/lists/application/services/json-schema-validator";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";

let inMemorySchemaRepository: InMemorySchemaRepository;
let jsonSchemaValidator: JsonSchemaValidator;

let sut: CreateSchema;

describe("Create Schema", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new CreateSchema(inMemorySchemaRepository, jsonSchemaValidator);
	});

	it("should create Schema", async () => {
		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "",
			creatorId: "1",
			data: {
				type: "object",
				properties: {
					name: { type: "string" },
					age: { type: "number" },
				},
			},
		});

		expect(inMemorySchemaRepository.schemas[0]).toEqual(response?.schema);
	});

	it("should thorws error for invalid schema Schema", async () => {
		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "",
					creatorId: "1",
					data: {
						type: "object",
						properties: {
							name: { type: "string" },
							age: { type: "number" },
						},
						invalidProperty:
							"This is not allowed in a valid JSON Schema",
					},
				}),
		).rejects.toBeInstanceOf(NotValidSchemaError);
	});
});
