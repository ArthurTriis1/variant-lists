import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { RegisterUser } from "./register-user";
import { HashGenerator } from "../services/hash-generator";
import { makeUser } from "@test/factories";
import { UserAlreadyExistsError } from "@src/core/errors/user-already-exists-error";
import { Hasher } from "@test/services/hasher";

let inMemoryUserRepository: InMemoryUserRepository;
let hasher: HashGenerator;

let sut: RegisterUser;

describe("Create User", () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository();
		hasher = new Hasher();

		sut = new RegisterUser(inMemoryUserRepository, hasher);
	});

	it("should create User", async () => {
		const user = makeUser();

		const response = await sut.execute({
			email: user.email,
			name: user.name,
			username: user.username,
			password: user.password,
		});

		expect(inMemoryUserRepository.users[0].id.toValue()).toEqual(
			response?.user.id.toValue(),
		);
	});

	it("should thorws error if user email alredy exists", async () => {
		const user1 = makeUser({ email: "user@user.com" });

		await sut.execute({
			email: user1.email,
			name: user1.name,
			password: user1.password,
			username: user1.username,
		});

		const user2 = makeUser({ email: "user@user.com" });

		expect(
			async () =>
				await sut.execute({
					email: user2.email,
					name: user2.name,
					password: user2.password,
					username: user2.username,
				}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
