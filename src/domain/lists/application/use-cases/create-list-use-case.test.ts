import { InMemoryListRepository } from "test/repositories/in-memory-list-repository";
import { CreateListUseCase } from "./create-list-use-case";

let inMemoryListRepository: InMemoryListRepository;

let sut: CreateListUseCase;

describe("Create List", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();

		sut = new CreateListUseCase(inMemoryListRepository);
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
