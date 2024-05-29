import { User } from "../../enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { HashComparer } from "../services";
import { NotAllowedError } from "@src/core/errors";

interface AutenticateUserRequest {
	email: string;
	password: string;
}

type AutenticateUserResponse = {
	user: User;
};

export class AutenticateUser {
	constructor(
		private usersRepository: UserRepository,
		private hashComparer: HashComparer,
	) {}

	async execute({
		email,
		password,
	}: AutenticateUserRequest): Promise<AutenticateUserResponse> {
		const user = await this.usersRepository.findByEmailOrUsername({
			email,
		});

		if (!user) {
			throw new NotAllowedError();
		}

		const passwordMatchs = await this.hashComparer.compare(
			password,
			user.password,
		);

		if (!passwordMatchs) {
			throw new NotAllowedError();
		}

		return {
			user,
		};
	}
}
