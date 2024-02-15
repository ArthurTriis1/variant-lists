import { PrismaUserMapper } from "@src/database/prisma/mappers/prisma-schema-user";
import { prisma } from "@src/prisma";
import { User, UserProps, makeUser } from "@variant-lists/domain";

export const makePrismaUser = async (
	data: Partial<UserProps> = {},
): Promise<User> => {
	const user = makeUser(data);

	await prisma.user.create({
		data: PrismaUserMapper.toPrisma(user),
	});

	return user;
};
