import { makeList } from "test/factories/make-list";
import { InMemoryListRepository } from "test/repositories/in-memory-list-repository";
import { GetListBySlugUseCase } from "./get-list-by-slug";
import { ListNotFoundError } from "@src/core/errors/errors/list-not-found-error";

let sut: GetListBySlugUseCase;

let inMemoryListRepository: InMemoryListRepository;

describe("Get List by slug", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();

		sut = new GetListBySlugUseCase(inMemoryListRepository);
	});

	it("should return list", async () => {
		const list = makeList();
		inMemoryListRepository.create(list);

		const { list: foundList } = await sut.execute({
			slug: list.slug.value,
		});

		expect(foundList.id).toEqual(list.id);
	});

	it("should throws error if list not found", async () => {
		const list = makeList();

		expect(async () => {
			await sut.execute({
				slug: list.slug.value,
			});
		}).rejects.toBeInstanceOf(ListNotFoundError);
	});
});
