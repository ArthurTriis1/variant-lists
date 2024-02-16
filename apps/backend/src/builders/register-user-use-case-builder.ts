import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user-repository";
import {
	BcryptHasher,
	HashGenerator,
	RegisterUser,
} from "@variant-lists/domain";

export default class RegisterUserBuilder {
	prismaUserRepository: PrismaUserRepository;
	bcryptHasher: HashGenerator;
	constructor() {
		this.prismaUserRepository = new PrismaUserRepository();
		this.bcryptHasher = new BcryptHasher();
	}

	build() {
		return new RegisterUser(this.prismaUserRepository, this.bcryptHasher);
	}
}
