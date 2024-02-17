import { PrismaListMapper } from "@src/database/prisma/mappers/prisma-list.mapper";
import { prisma } from "@src/prisma";
import { List, ListProps, makeList } from "@variant-lists/domain";

export const makePrismaList = async (
	data: Partial<ListProps> = {},
): Promise<List> => {
	const list = makeList(data);

	await prisma.list.create({
		data: PrismaListMapper.toPrisma(list),
	});

	return list;
};
