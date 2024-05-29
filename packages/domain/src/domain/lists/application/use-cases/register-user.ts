import { UserAlreadyExistsError } from "@src/core/errors/user-already-exists-error";
import { User } from "../../enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { HashGenerator } from "../services/hash-generator";

interface RegisterUserRequest {
	name: string;
	email: string;
	username: string;
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
		username,
		email,
		password,
	}: RegisterUserRequest): Promise<RegisterUserResponse> {
		const userFound = await this.usersRepository.findByEmailOrUsername({
			email,
			username,
		});

		if (userFound) {
			throw new UserAlreadyExistsError();
		}

		const hashedPassword = await this.hashGenerator.hash(password);

		const user = User.create({
			name,
			email,
			username,
			password: hashedPassword,
		});

		await this.usersRepository.create(user);

		return {
			user,
		};
	}
}
