import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { GetListBySlug } from "@variant-lists/domain";

export default class GetListBySlugBuilder {
	prismaListRepository: PrismaListRepository;
	prismaUserRepository: PrismaUserRepository;

	constructor() {
		this.prismaListRepository = new PrismaListRepository();
		this.prismaUserRepository = new PrismaUserRepository();
	}

	build() {
		return new GetListBySlug(
			this.prismaListRepository,
			this.prismaUserRepository,
		);
	}
}
