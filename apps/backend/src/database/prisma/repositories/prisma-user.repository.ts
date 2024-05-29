import { prisma } from "@src/prisma";
import {
	FindByEmailOrUsernameProps,
	User,
	UserRepository,
} from "@variant-lists/domain";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";

class PrismaUserRepository implements UserRepository {
	async create(user: User): Promise<void> {
		const data = PrismaUserMapper.toPrisma(user);

		await prisma.user.create({ data });
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user ? PrismaUserMapper.toDomain(user) : null;
	}

	async findByEmailOrUsername({
		username,
		email,
	}: FindByEmailOrUsernameProps): Promise<User | null> {
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }],
			},
		});

		return user ? PrismaUserMapper.toDomain(user) : null;
	}
}

export default PrismaUserRepository;
