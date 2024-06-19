import PrismaItemRepository from "@src/database/prisma/repositories/prisma-item.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { GetItemBySlug } from "@variant-lists/domain";

export default class GetItemBySlugBuilder {
	prismaItemRepository: PrismaItemRepository;
	prismaUserRepository: PrismaUserRepository;

	constructor() {
		this.prismaItemRepository = new PrismaItemRepository();
		this.prismaUserRepository = new PrismaUserRepository();
	}

	build() {
		return new GetItemBySlug(
			this.prismaItemRepository,
			this.prismaUserRepository,
		);
	}
}
