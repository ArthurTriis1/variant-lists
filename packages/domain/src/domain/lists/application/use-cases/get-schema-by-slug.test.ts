import { makeSchema, makeUser } from "@test/factories";
import {
	InMemorySchemaRepository,
	InMemoryUserRepository,
} from "@test/repositories";
import { GetSchemaBySlug } from "@src/domain/lists/application/use-cases/get-schema-by-slug";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";

let sut: GetSchemaBySlug;

let inMemorySchemaRepository: InMemorySchemaRepository;
let inMemoryUserRepository: InMemoryUserRepository;

describe("Get Schema by slug", () => {
	beforeEach(() => {
		inMemorySchemaRepository = new InMemorySchemaRepository();
		inMemoryUserRepository = new InMemoryUserRepository();

		sut = new GetSchemaBySlug(
			inMemorySchemaRepository,
			inMemoryUserRepository,
		);
	});

	it("should return schema", async () => {
		const user = makeUser({
			username: "user_name",
		});
		const schema = makeSchema({ creatorUsername: user.username });
		inMemoryUserRepository.create(user);
		inMemorySchemaRepository.create(schema);

		const { schema: foundSchema } = await sut.execute({
			slug: schema.slug.value,
			creatorUsername: "user_name",
			userId: user.id.toString(),
		});

		expect(foundSchema.id).toEqual(schema.id);
	});

	it("should throws error if schema not found", async () => {
		const user = makeUser({
			username: "user_name",
		});
		const schema = makeSchema({ creatorUsername: user.username });
		inMemoryUserRepository.create(user);
		inMemorySchemaRepository.create(schema);

		expect(async () => {
			await sut.execute({
				slug: "slug",
				creatorUsername: "user_name",
				userId: user.id.toString(),
			});
		}).rejects.toBeInstanceOf(SchemaNotFoundError);
	});

	it("should throws error if user not allowed", async () => {
		const schema = makeSchema({ creatorUsername: "user_name" });
		inMemorySchemaRepository.create(schema);

		expect(async () => {
			await sut.execute({
				slug: schema.slug.value,
				creatorUsername: "user_name",
				userId: "1",
			});
		}).rejects.toBeInstanceOf(NotAllowedError);
	});
});
