import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import { FetchListsByUser } from "@variant-lists/domain";

export default class FetchListsByUserBuilder {
	prismaListRepository: PrismaListRepository;
	constructor() {
		this.prismaListRepository = new PrismaListRepository();
	}

	build() {
		return new FetchListsByUser(this.prismaListRepository);
	}
}
