import PrismaItemRepository from "@src/database/prisma/repositories/prisma-item.repository";
import { GetItemBySlug } from "@variant-lists/domain";

export default class GetItemBySlugBuilder {
	prismaItemRepository: PrismaItemRepository;
	constructor() {
		this.prismaItemRepository = new PrismaItemRepository();
	}

	build() {
		return new GetItemBySlug(this.prismaItemRepository);
	}
}
