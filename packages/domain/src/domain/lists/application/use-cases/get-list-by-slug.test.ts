import { makeList } from "@test/factories/make-list";
import { GetListBySlug } from "@src/domain/lists/application/use-cases/get-list-by-slug";
import { ListNotFoundError } from "@src/core/errors/list-not-found-error";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";
import {
	InMemoryUserRepository,
	InMemoryListRepository,
} from "@test/repositories";
import { makeUser } from "@test/factories";

let sut: GetListBySlug;

let inMemoryListRepository: InMemoryListRepository;
let inMemoryUserRepository: InMemoryUserRepository;

describe("Get List by slug", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();
		inMemoryUserRepository = new InMemoryUserRepository();

		sut = new GetListBySlug(inMemoryListRepository, inMemoryUserRepository);
	});

	it("should return list", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const list = makeList({ creatorUsername: user.username });
		inMemoryListRepository.create(list);

		const { list: foundList } = await sut.execute({
			slug: list.slug.value,
			creatorUsername: user.username,
			userId: user.id.toString(),
		});

		expect(foundList.id).toEqual(list.id);
	});

	it("should throws error if list not found", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const list = makeList({ creatorUsername: user.username });

		expect(async () => {
			await sut.execute({
				slug: list.slug.value,
				creatorUsername: user.username,
				userId: user.id.toString(),
			});
		}).rejects.toBeInstanceOf(ListNotFoundError);
	});

	it("should throws error if user not allowed", async () => {
		const user = makeUser({}, new UniqueEntityID("1"));
		inMemoryUserRepository.create(user);

		const list = makeList({ creatorUsername: user.username });
		inMemoryListRepository.create(list);

		expect(async () => {
			await sut.execute({
				slug: list.slug.value,
				creatorUsername: user.username,
				userId: "2",
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});
});
