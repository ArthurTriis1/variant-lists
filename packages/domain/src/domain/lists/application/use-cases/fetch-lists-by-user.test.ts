import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { makeList } from "@test/factories/make-list";
import { FetchListsByUser } from "@src/domain/lists/application/use-cases/fetch-lists-by-user";

let inMemoryListRepository: InMemoryListRepository;

let sut: FetchListsByUser;

describe("Fetch Lists", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();

		sut = new FetchListsByUser(inMemoryListRepository);
	});

	it("Should list all lists", async () => {
		await inMemoryListRepository.create(
			makeList({
				creatorUsername: "creator-1",
			}),
		);
		await inMemoryListRepository.create(
			makeList({
				creatorUsername: "creator-1",
			}),
		);
		await inMemoryListRepository.create(
			makeList({
				creatorUsername: "creator-1",
			}),
		);

		const { lists } = await sut.execute({
			creatorUsername: "creator-1",
		});

		expect(lists).toHaveLength(3);
	});
});
