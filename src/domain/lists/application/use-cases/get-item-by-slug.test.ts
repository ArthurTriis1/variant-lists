import { makeItem } from "test/factories/make-item";
import { InMemoryItemRepository } from "test/repositories/in-memory-item-repository";
import { GetItemBySlugUseCase } from "./get-item-by-slug";
import { ItemNotFoundError } from "@src/core/errors/errors/item-not-found-error";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";

let sut: GetItemBySlugUseCase;

let inMemoryItemRepository: InMemoryItemRepository;

describe("Get Item by slug", () => {
	beforeEach(() => {
		inMemoryItemRepository = new InMemoryItemRepository();

		sut = new GetItemBySlugUseCase(inMemoryItemRepository);
	});

	it("should return item", async () => {
		const item = makeItem({ creatorId: new UniqueEntityID("1") });
		inMemoryItemRepository.create(item);

		const { item: foundItem } = await sut.execute({
			slug: item.slug.value,
			creatorId: "1",
		});

		expect(foundItem.id).toEqual(item.id);
	});

	it("should throws error if item not found", async () => {
		const item = makeItem({ creatorId: new UniqueEntityID("1") });

		expect(async () => {
			await sut.execute({
				slug: item.slug.value,
				creatorId: "1",
			});
		}).rejects.toBeInstanceOf(ItemNotFoundError);
	});

	it("should throws error if user not allowed", async () => {
		const item = makeItem({ creatorId: new UniqueEntityID("1") });
		inMemoryItemRepository.create(item);

		expect(async () => {
			await sut.execute({
				slug: item.slug.value,
				creatorId: "2",
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});
});
