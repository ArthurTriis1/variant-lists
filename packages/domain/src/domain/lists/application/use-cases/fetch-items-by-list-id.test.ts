import { InMemoryItemRepository } from "@test/repositories/in-memory-item-repository";
import { makeItem } from "@test/factories/make-item";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { FetchItemsByListId } from "@src/domain/lists/application/use-cases/fetch-items-by-list-id";

let inMemoryItemRepository: InMemoryItemRepository;

let sut: FetchItemsByListId;

describe("Fetch Items", () => {
	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository();

		sut = new FetchItemsByListId(inMemoryItemRepository);
	});

	it("Should return all items", async () => {
		await inMemoryItemRepository.create(
			makeItem({
				listId: new UniqueEntityID("list-1"),
			}),
		);
		await inMemoryItemRepository.create(
			makeItem({
				listId: new UniqueEntityID("list-1"),
			}),
		);
		await inMemoryItemRepository.create(
			makeItem({
				listId: new UniqueEntityID("list-1"),
			}),
		);

		const { items } = await sut.execute({
			listId: "list-1",
		});

		expect(items).toHaveLength(3);
	});

	it("should be able to fetch paginated items", async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryItemRepository.create(
				makeItem({
					listId: new UniqueEntityID("list-1"),
				}),
			);
		}

		const { items } = await sut.execute({
			listId: "list-1",
			page: 2,
		});

		expect(items).toHaveLength(2);
	});
});
