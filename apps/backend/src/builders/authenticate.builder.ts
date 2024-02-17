import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { BcryptHasher } from "@src/services/bcrypt-hasher.service";
import { HashComparer, AutenticateUser } from "@variant-lists/domain";

export default class AutenticateUserBuilder {
	prismaUserRepository: PrismaUserRepository;
	bcryptHasher: HashComparer;
	constructor() {
		this.prismaUserRepository = new PrismaUserRepository();
		this.bcryptHasher = new BcryptHasher();
	}

	build() {
		return new AutenticateUser(
			this.prismaUserRepository,
			this.bcryptHasher,
		);
	}
}
