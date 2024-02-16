import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { CreateList } from "@src/domain/lists/application/use-cases/create-list";
import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { makeSchema } from "@test/factories/make-schema";

let inMemoryListRepository: InMemoryListRepository;
let inMemorySchemaRepository: InMemorySchemaRepository;

let sut: CreateList;

describe("Create List", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();
		inMemorySchemaRepository = new InMemorySchemaRepository();

		sut = new CreateList(inMemoryListRepository, inMemorySchemaRepository);
	});

	it("should create List", async () => {
		const schema = makeSchema();

		inMemorySchemaRepository.create(schema);

		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "description",
			creatorId: "1",
			schemaId: schema.id.toString(),
		});

		expect(inMemoryListRepository.lists[0]).toEqual(response?.list);
	});
});
