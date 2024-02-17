import { InMemoryListRepository } from "@test/repositories/in-memory-list-repository";
import { CreateList } from "@src/domain/lists/application/use-cases/create-list";
import { InMemorySchemaRepository } from "@test/repositories/in-memory-schema-repository";
import { makeSchema } from "@test/factories/make-schema";
import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { makeUser } from "@test/factories";

let inMemoryListRepository: InMemoryListRepository;
let inMemorySchemaRepository: InMemorySchemaRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: CreateList;

describe("Create List", () => {
	beforeEach(() => {
		inMemoryListRepository = new InMemoryListRepository();
		inMemorySchemaRepository = new InMemorySchemaRepository();
		inMemoryUserRepository = new InMemoryUserRepository();

		sut = new CreateList(
			inMemoryListRepository,
			inMemorySchemaRepository,
			inMemoryUserRepository,
		);
	});

	it("should create List", async () => {
		const user = makeUser();
		inMemoryUserRepository.create(user);

		const schema = makeSchema();

		inMemorySchemaRepository.create(schema);

		const response = await sut.execute({
			title: "Primeiro esquema",
			description: "description",
			creatorId: user.id.toString(),
			schemaId: schema.id.toString(),
		});

		expect(inMemoryListRepository.lists[0]).toEqual(response?.list);
	});
});
