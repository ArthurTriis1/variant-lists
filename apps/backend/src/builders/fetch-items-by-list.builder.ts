import PrismaItemRepository from "@src/database/prisma/repositories/prisma-item.repository";
import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { FetchItemsByListId } from "@variant-lists/domain";

export default class FetchItemsByListBuilder {
	prismaItemRepository: PrismaItemRepository;
	prismaListRepository: PrismaListRepository;
	prismaUserRepository: PrismaUserRepository;

	constructor() {
		this.prismaItemRepository = new PrismaItemRepository();
		this.prismaListRepository = new PrismaListRepository();
		this.prismaUserRepository = new PrismaUserRepository();
	}

	build() {
		return new FetchItemsByListId(
			this.prismaItemRepository,
			this.prismaListRepository,
			this.prismaUserRepository,
		);
	}
}
