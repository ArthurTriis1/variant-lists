import { makeList } from "test/factories/make-list";
import { InMemoryListRepository } from "test/repositories/in-memory-list-repository";
import { GetListBySlugUseCase } from "./get-list-by-slug";
import { ListNotFoundError } from "@src/core/errors/errors/list-not-found-error";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";

let sut: GetListBySlugUseCase;

let inMemoryListRepository: InMemoryListRepository;

describe("Get List by slug", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();

		sut = new GetListBySlugUseCase(inMemoryListRepository);
	});

	it("should return list", async () => {
		const list = makeList({ creatorId: new UniqueEntityID("1") });
		inMemoryListRepository.create(list);

		const { list: foundList } = await sut.execute({
			slug: list.slug.value,
			creatorId: "1",
		});

		expect(foundList.id).toEqual(list.id);
	});

	it("should throws error if list not found", async () => {
		const list = makeList({ creatorId: new UniqueEntityID("1") });

		expect(async () => {
			await sut.execute({
				slug: list.slug.value,
				creatorId: "1",
			});
		}).rejects.toBeInstanceOf(ListNotFoundError);
	});

	it("should throws error if user not allowed", async () => {
		const list = makeList({ creatorId: new UniqueEntityID("1") });
		inMemoryListRepository.create(list);

		expect(async () => {
			await sut.execute({
				slug: list.slug.value,
				creatorId: "2",
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});
});
