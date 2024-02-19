import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import { FetchSchemasByUser } from "@variant-lists/domain";

export default class FetchSchemasByUserBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
	}

	build() {
		return new FetchSchemasByUser(this.prismaSchemaRepository);
	}
}
