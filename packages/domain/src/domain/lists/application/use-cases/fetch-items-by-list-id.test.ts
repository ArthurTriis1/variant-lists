import { InMemoryItemRepository } from "@test/repositories/in-memory-item-repository";
import { makeItem } from "@test/factories/make-item";
import { FetchItemsByListId } from "@src/domain/lists/application/use-cases/fetch-items-by-list-id";
import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { makeUser } from "@test/factories/make-user";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { makeList } from "@test/factories/make-list";

let inMemoryItemRepository: InMemoryItemRepository;
let inMemoryListRepository: InMemoryListRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: FetchItemsByListId;

describe("Fetch Items", () => {
	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository();
		inMemoryListRepository = new InMemoryListRepository();
		inMemoryUserRepository = new InMemoryUserRepository();

		sut = new FetchItemsByListId(
			inMemoryItemRepository,
			inMemoryListRepository,
		);
	});

	it("Should return all items", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const list = makeList({ creatorId: user.id });
		inMemoryListRepository.create(list);

		await inMemoryItemRepository.create(
			makeItem({
				listId: list.id,
				creatorId: user.id,
			}),
		);
		await inMemoryItemRepository.create(
			makeItem({
				listId: list.id,
				creatorId: user.id,
			}),
		);
		await inMemoryItemRepository.create(
			makeItem({
				listId: list.id,
				creatorId: user.id,
			}),
		);

		const { items } = await sut.execute({
			listId: list.id.toString(),
			creatorId: user.id.toString(),
		});

		expect(items).toHaveLength(3);
	});

	it("should be able to fetch paginated items", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const list = makeList({ creatorId: user.id });
		inMemoryListRepository.create(list);

		for (let i = 1; i <= 22; i++) {
			await inMemoryItemRepository.create(
				makeItem({
					listId: list.id,
				}),
			);
		}

		const { items } = await sut.execute({
			listId: list.id.toString(),
			creatorId: user.id.toString(),
			page: 2,
		});

		expect(items).toHaveLength(2);
	});
});
