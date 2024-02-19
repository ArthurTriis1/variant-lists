import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import { GetListBySlug } from "@variant-lists/domain";

export default class GetListBySlugBuilder {
	prismaListRepository: PrismaListRepository;
	constructor() {
		this.prismaListRepository = new PrismaListRepository();
	}

	build() {
		return new GetListBySlug(this.prismaListRepository);
	}
}
