import { InMemorySchemaRepository } from "test/repositories/in-memory-schema-repository";
import { CreateSchemaUseCase } from "./create-schema-use-case";

let inMemorySchemaRepository: InMemorySchemaRepository;

let sut: CreateSchemaUseCase;

describe("Comment on Schema", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();

		sut = new CreateSchemaUseCase(inMemorySchemaRepository);
	});

	it("should create Schema", async () => {
		const { schema } = await sut.execute({
			title: "Primeiro esquema",
			creatorId: "1",
			data: {},
		});

		expect(inMemorySchemaRepository.items[0]).toEqual(schema);
	});
});
