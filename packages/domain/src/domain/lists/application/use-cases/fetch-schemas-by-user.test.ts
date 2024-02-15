import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { makeSchema } from "@test/factories/make-schema";
import { FetchSchemasByUser } from "@src/domain/lists/application/use-cases/fetch-schemas-by-user";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

let inMemorySchemaRepository: InMemorySchemaRepository;

let sut: FetchSchemasByUser;

describe("Fetch Schemas", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();

		sut = new FetchSchemasByUser(inMemorySchemaRepository);
	});

	it("Should list all schemas", async () => {
		await inMemorySchemaRepository.create(
			makeSchema({
				creatorId: new UniqueEntityID("creator-1"),
			}),
		);
		await inMemorySchemaRepository.create(
			makeSchema({
				creatorId: new UniqueEntityID("creator-1"),
			}),
		);
		await inMemorySchemaRepository.create(
			makeSchema({
				creatorId: new UniqueEntityID("creator-1"),
			}),
		);

		const { schemas } = await sut.execute({
			creatorId: "creator-1",
		});

		expect(schemas).toHaveLength(3);
	});
});
