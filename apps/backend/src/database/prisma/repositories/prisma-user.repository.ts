import { prisma } from "@src/prisma";
import { User, UserRepository } from "@variant-lists/domain";
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

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user ? PrismaUserMapper.toDomain(user) : null;
	}
}

export default PrismaUserRepository;
