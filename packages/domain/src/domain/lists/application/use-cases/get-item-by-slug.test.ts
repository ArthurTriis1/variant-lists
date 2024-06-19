import { makeItem } from "@test/factories/make-item";
import { GetItemBySlug } from "@src/domain/lists/application/use-cases/get-item-by-slug";
import { ItemNotFoundError } from "@src/core/errors/item-not-found-error";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";
import {
	InMemoryUserRepository,
	InMemoryItemRepository,
} from "@test/repositories";
import { makeUser } from "@test/factories";

let sut: GetItemBySlug;

let inMemoryItemRepository: InMemoryItemRepository;
let inMemoryUserRepository: InMemoryUserRepository;

describe("Get Item by slug", () => {
	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository();
		inMemoryUserRepository = new InMemoryUserRepository();

		sut = new GetItemBySlug(inMemoryItemRepository, inMemoryUserRepository);
	});

	it("should return item", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const item = makeItem({ creatorUsername: user.username });
		inMemoryItemRepository.create(item);

		const { item: foundItem } = await sut.execute({
			slug: item.slug.value,
			creatorUsername: item.creatorUsername,
			listSlug: item.listSlug,
			userId: user.id.toString(),
		});

		expect(foundItem.id).toEqual(item.id);
	});

	it("should throws error if item not found", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const item = makeItem({ creatorUsername: user.username });

		expect(async () => {
			await sut.execute({
				slug: item.slug.value,
				creatorUsername: item.creatorUsername,
				listSlug: item.listSlug,
				userId: user.id.toString(),
			});
		}).rejects.toBeInstanceOf(ItemNotFoundError);
	});

	it("should throws error if user not allowed", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const item = makeItem({ creatorUsername: user.username });
		inMemoryItemRepository.create(item);

		expect(async () => {
			await sut.execute({
				slug: item.slug.value,
				creatorUsername: item.creatorUsername,
				listSlug: item.listSlug,
				userId: "2",
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});
});
