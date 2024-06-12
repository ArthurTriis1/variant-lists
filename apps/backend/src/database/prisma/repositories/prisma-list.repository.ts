import { prisma } from "@src/prisma";
import { List, ListRepository } from "@variant-lists/domain";
import { PrismaListMapper } from "../mappers/prisma-list.mapper";

class PrismaListRepository implements ListRepository {
	async create(list: List): Promise<void> {
		const data = PrismaListMapper.toPrisma(list);
		await prisma.list.create({ data });
	}

	async save(list: List): Promise<void> {
		const data = PrismaListMapper.toPrisma(list);

		await prisma.list.update({
			where: {
				id: data.id,
			},
			data,
		});
	}

	async findById(id: string): Promise<List | null> {
		const list = await prisma.list.findUnique({
			where: {
				id,
			},
		});

		return list ? PrismaListMapper.toDomain(list) : null;
	}
	async findBySlug({
		slug,
		creatorUsername,
	}: {
		slug: string;
		creatorUsername: string;
	}): Promise<List | null> {
		const list = await prisma.list.findUnique({
			where: {
				creatorUsername_slug: { slug, creatorUsername },
			},
		});

		return list ? PrismaListMapper.toDomain(list) : null;
	}

	async findManyByCreatorUsername(creatorId: string): Promise<List[]> {
		const lists = await prisma.list.findMany({
			where: {
				creatorUsername: creatorId,
			},
		});

		return lists?.length ? lists.map(PrismaListMapper.toDomain) : [];
	}
}

export default PrismaListRepository;
