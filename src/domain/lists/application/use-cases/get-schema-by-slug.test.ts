import { makeSchema } from "test/factories/make-schema";
import { InMemorySchemaRepository } from "test/repositories/in-memory-schema-repository";
import { GetSchemaBySlugUseCase } from "./get-schema-by-slug";
import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";

let sut: GetSchemaBySlugUseCase;

let inMemorySchemaRepository: InMemorySchemaRepository;

describe("Get Schema by slug", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();

		sut = new GetSchemaBySlugUseCase(inMemorySchemaRepository);
	});

	it("should return schema", async () => {
		const schema = makeSchema({ creatorId: new UniqueEntityID("1") });
		inMemorySchemaRepository.create(schema);

		const { schema: foundSchema } = await sut.execute({
			slug: schema.slug.value,
			creatorId: "1",
		});

		expect(foundSchema.id).toEqual(schema.id);
	});

	it("should throws error if schema not found", async () => {
		const schema = makeSchema({ creatorId: new UniqueEntityID("1") });

		expect(async () => {
			await sut.execute({
				slug: schema.slug.value,
				creatorId: "1",
			});
		}).rejects.toBeInstanceOf(SchemaNotFoundError);
	});

	it("should throws error if user not allowed", async () => {
		const schema = makeSchema({ creatorId: new UniqueEntityID("1") });
		inMemorySchemaRepository.create(schema);

		expect(async () => {
			await sut.execute({
				slug: schema.slug.value,
				creatorId: "2",
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});
});
