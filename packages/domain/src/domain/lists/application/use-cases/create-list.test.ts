import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { CreateList } from "@src/domain/lists/application/use-cases/create-list";

let inMemoryListRepository: InMemoryListRepository;

let sut: CreateList;

describe("Create List", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();

		sut = new CreateList(inMemoryListRepository);
	});

	it("should create List", async () => {
		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "description",
			creatorId: "1",
			schemaId: "1",
		});

		expect(inMemoryListRepository.lists[0]).toEqual(response?.list);
	});
});
