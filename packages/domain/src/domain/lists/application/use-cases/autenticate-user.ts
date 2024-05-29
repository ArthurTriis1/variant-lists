import { AtLeastOne } from "@src/core/types/AtLeastOne";
import { User } from "../../enterprise/entities/user";
import { UserRepository } from "../repositories/user-repository";
import { HashComparer } from "../services";
import { NotAllowedError } from "@src/core/errors";

type AutenticateUserRequest = AtLeastOne<{
	email: string;
	username: string;
}> & {
	password: string;
};

export const autenticateUserRequest: AutenticateUserRequest = {
	password: "",
	username: "",
};

type AutenticateUserResponse = {
	user: User;
};

export class AutenticateUser {
	constructor(
		private usersRepository: UserRepository,
		private hashComparer: HashComparer,
	) {}

	async execute({
		password,
		...loginData
	}: AutenticateUserRequest): Promise<AutenticateUserResponse> {
		const user = await this.usersRepository.findByEmailOrUsername({
			...loginData,
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
