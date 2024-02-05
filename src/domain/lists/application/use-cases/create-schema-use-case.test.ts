import { InMemorySchemaRepository } from "test/repositories/in-memory-schema-repository";
import { CreateSchemaUseCase } from "./create-schema-use-case";
import { JsonSchemaValidator } from "../services/json-schema-validator";
import { NotValidSchemaError } from "@src/core/errors/errors/not-valid-schema-error";

let inMemorySchemaRepository: InMemorySchemaRepository;
let jsonSchemaValidator: JsonSchemaValidator;

let sut: CreateSchemaUseCase;

describe("Create Schema", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new CreateSchemaUseCase(
			inMemorySchemaRepository,
			jsonSchemaValidator,
		);
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
