import { PrismaItemMapper } from "@src/database/prisma/mappers/prisma-item.mapper";
import { prisma } from "@src/prisma";
import { Item, ItemProps, makeItem } from "@variant-lists/domain";

export const makePrismaItem = async (
	data: Partial<ItemProps> = {},
): Promise<Item> => {
	const item = makeItem(data);

	await prisma.item.create({
		data: PrismaItemMapper.toPrisma(item),
	});

	return item;
};
