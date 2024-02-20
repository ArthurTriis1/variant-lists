import { prisma } from "@src/prisma";
import { Item, ItemRepository, PaginationParams } from "@variant-lists/domain";
import { PrismaItemMapper } from "../mappers/prisma-item.mapper";

class PrismaItemRepository implements ItemRepository {
	async create(item: Item): Promise<void> {
		const data = PrismaItemMapper.toPrisma(item);
		await prisma.item.create({ data });
	}
	async save(item: Item): Promise<void> {
		const data = PrismaItemMapper.toPrisma(item);
		await prisma.item.update({
			where: {
				id: data.id,
			},
			data,
		});
	}
	async findBySlug(slug: string): Promise<Item | null> {
		const item = await prisma.item.findUnique({
			where: {
				slug,
			},
		});

		return item ? PrismaItemMapper.toDomain(item) : null;
	}
	async findManyByListId(
		listId: string,
		{ page }: PaginationParams,
	): Promise<Item[]> {
		const items = await prisma.item.findMany({
			where: {
				listId,
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return items.length ? items.map(PrismaItemMapper.toDomain) : [];
	}

	async countByListId(listId: string): Promise<number> {
		return await prisma.item.count({
			where: {
				listId,
			},
		});
	}

	async findAllByListId(listId: string): Promise<Item[]> {
		const items = await prisma.item.findMany({
			where: {
				listId,
			},
		});

		return items.length ? items.map(PrismaItemMapper.toDomain) : [];
	}
}

export default PrismaItemRepository;
