import { InMemoryUserRepository } from "@test/repositories/in-memory-user-repository";
import { AutenticateUser } from "./autenticate-user";
import { makeUser } from "@test/factories";
// import { UserAlreadyExistsError } from "@src/core/errors/user-already-exists-error";
import { Hasher } from "@test/services/hasher";
import { HashComparer } from "../services";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";

let inMemoryUserRepository: InMemoryUserRepository;
let hasher: HashComparer;

let sut: AutenticateUser;

describe("Autenticate User", () => {
	beforeEach(() => {
		inMemoryUserRepository = new InMemoryUserRepository();
		hasher = new Hasher();

		sut = new AutenticateUser(inMemoryUserRepository, hasher);
	});

	it("should auth User", async () => {
		const user = makeUser({ password: "password-hash" });

		inMemoryUserRepository.users.push(user);

		const response = await sut.execute({
			email: user.email,
			password: "password",
		});

		expect(response.user).toBeTruthy();
	});

	it("should thorws error if password do not matchs", async () => {
		const user = makeUser({ password: "password-hash" });

		inMemoryUserRepository.users.push(user);

		expect(
			async () =>
				await sut.execute({
					email: user.email,
					password: "wrong-password",
				}),
		).rejects.toBeInstanceOf(NotAllowedError);
	});
});
