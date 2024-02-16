import { UserAlreadyExistsError } from "@src/core/errors/user-already-exists-error";
import { User } from "../../enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { HashGenerator } from "../services/hash-generator";

interface RegisterUserRequest {
	name: string;
	email: string;
	password: string;
}

type RegisterUserResponse = {
	user: User;
};

export class RegisterUser {
	constructor(
		private usersRepository: UserRepository,
		private hashGenerator: HashGenerator,
	) {}

	async execute({
		name,
		email,
		password,
	}: RegisterUserRequest): Promise<RegisterUserResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const hashedPassword = await this.hashGenerator.hash(password);

		const user = User.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.usersRepository.create(user);

		return {
			user,
		};
	}
}
