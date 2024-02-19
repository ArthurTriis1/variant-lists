import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { CreateList } from "@variant-lists/domain";

export default class CreateItemBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	prismaUserRepository: PrismaUserRepository;
	prismaListRepository: PrismaListRepository;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.prismaUserRepository = new PrismaUserRepository();
		this.prismaListRepository = new PrismaListRepository();
	}

	build() {
		return new CreateList(
			this.prismaListRepository,
			this.prismaSchemaRepository,
			this.prismaUserRepository,
		);
	}
}
