import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { RegisterUser } from "./register-user";
import { HashGenerator } from "../services/hash-generator";
import { BcryptHasher } from "../services/bcrypt-hasher";
import { makeUser } from "@test/factories";
import { UserAlreadyExistsError } from "@src/core/errors/user-already-exists-error";

let inMemoryUserRepository: InMemoryUserRepository;
let bcryptHasher: HashGenerator;

let sut: RegisterUser;

describe("Create User", () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository();
		bcryptHasher = new BcryptHasher();

		sut = new RegisterUser(inMemoryUserRepository, bcryptHasher);
	});

	it("should create User", async () => {
		const user = makeUser();

		const response = await sut.execute({
			email: user.email,
			name: user.name,
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
		});

		const user2 = makeUser({ email: "user@user.com" });

		expect(
			async () =>
				await sut.execute({
					email: user2.email,
					name: user2.name,
					password: user2.password,
				}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
