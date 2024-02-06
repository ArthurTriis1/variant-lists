import { makeSchema } from "test/factories/make-schema";
import { InMemorySchemaRepository } from "test/repositories/in-memory-schema-repository";
import { GetSchemaBySlugUseCase } from "./get-schema-by-slug";
import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error";

let sut: GetSchemaBySlugUseCase;

let inMemorySchemaRepository: InMemorySchemaRepository;

describe("Get Schema by slug", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();

		sut = new GetSchemaBySlugUseCase(inMemorySchemaRepository);
	});

	it("should return schema", async () => {
		const schema = makeSchema();
		inMemorySchemaRepository.create(schema);

		const { schema: foundSchema } = await sut.execute({
			slug: schema.slug.value,
		});

		expect(foundSchema.id).toEqual(schema.id);
	});

	it("should throws error if schema not found", async () => {
		const schema = makeSchema();

		expect(async () => {
			await sut.execute({
				slug: schema.slug.value,
			});
		}).rejects.toBeInstanceOf(SchemaNotFoundError);
	});
});
