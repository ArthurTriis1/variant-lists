import { User as PrismaUser, Prisma } from "@prisma/client";
import { User, UniqueEntityID } from "@variant-lists/domain";

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.name,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
		return {
			id: user.id.toString(),
			name: user.name,
			password: user.password,
			email: user.email,
		};
	}
}
