import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { makeList } from "@test/factories/make-list";
import { FetchListsByUserUseCase } from "@src/domain/lists/application/use-cases/fetch-lists-by-user";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

let inMemoryListRepository: InMemoryListRepository;

let sut: FetchListsByUserUseCase;

describe("Fetch Lists", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();

		sut = new FetchListsByUserUseCase(inMemoryListRepository);
	});

	it("Should list all lists", async () => {
		await inMemoryListRepository.create(
			makeList({
				creatorId: new UniqueEntityID("creator-1"),
			}),
		);
		await inMemoryListRepository.create(
			makeList({
				creatorId: new UniqueEntityID("creator-1"),
			}),
		);
		await inMemoryListRepository.create(
			makeList({
				creatorId: new UniqueEntityID("creator-1"),
			}),
		);

		const { lists } = await sut.execute({
			creatorId: "creator-1",
		});

		expect(lists).toHaveLength(3);
	});
});
