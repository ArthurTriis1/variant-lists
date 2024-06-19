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
	async findBySlug({
		slug,
		listSlug,
		creatorUsername,
	}: {
		slug: string;
		listSlug: string;
		creatorUsername: string;
	}): Promise<Item | null> {
		const item = await prisma.item.findUnique({
			where: {
				creatorUsername_listSlug_slug: {
					slug,
					creatorUsername,
					listSlug,
				},
			},
		});

		return item ? PrismaItemMapper.toDomain(item) : null;
	}

	async findManyByListSlug(
		listSlug: string,
		creatorUsername: string,
		{ page }: PaginationParams,
	): Promise<Item[]> {
		const items = await prisma.item.findMany({
			where: {
				listSlug,
				creatorUsername,
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return items.length ? items.map(PrismaItemMapper.toDomain) : [];
	}

	async countByListSlug(listSlug: string, creatorUsername: string) {
		return await prisma.item.count({
			where: {
				listSlug,
				creatorUsername,
			},
		});
	}

	async findAllByListSlug(listSlug: string, creatorUsername: string) {
		const items = await prisma.item.findMany({
			where: {
				listSlug,
				creatorUsername,
			},
		});

		return items.length ? items.map(PrismaItemMapper.toDomain) : [];
	}
}

export default PrismaItemRepository;
