import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { CreateSchema } from "@src/domain/lists/application/use-cases/create-schema";
import { JsonSchemaValidator } from "@src/domain/lists/application/services/json-schema-validator";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { makeUser } from "@test/factories/make-user";
import { SlugAlreadyExistsError } from "@src/core/errors";

let inMemorySchemaRepository: InMemorySchemaRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let jsonSchemaValidator: JsonSchemaValidator;

let sut: CreateSchema;

describe("Create Schema", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();
		inMemoryUserRepository = new InMemoryUserRepository();
		jsonSchemaValidator = new JsonSchemaValidator();

		sut = new CreateSchema(
			inMemorySchemaRepository,
			inMemoryUserRepository,
			jsonSchemaValidator,
		);
	});

	it("should create Schema", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "",
			creatorId: user.id.toString(),
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

	it("should throws already exists slug", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		await sut.execute({
			title: "Primeiro esquema",
			description: "",
			creatorId: user.id.toString(),
			data: {
				type: "object",
				properties: {
					name: { type: "string" },
					age: { type: "number" },
				},
			},
		});

		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "",
					creatorId: user.id.toString(),
					data: {
						type: "object",
						properties: {
							name: { type: "string" },
							age: { type: "number" },
						},
					},
				}),
		).rejects.toBeInstanceOf(SlugAlreadyExistsError);
	});

	it("should thorws error for invalid schema Schema", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);
		expect(
			async () =>
				await sut.execute({
					title: "Primeiro esquema",
					description: "",
					creatorId: user.id.toString(),
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
