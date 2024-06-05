import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { GetSchemaBySlug } from "@variant-lists/domain";

export default class GetSchemaBySlugBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	prismaUserRepository: PrismaUserRepository;

	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.prismaUserRepository = new PrismaUserRepository();
	}

	build() {
		return new GetSchemaBySlug(
			this.prismaSchemaRepository,
			this.prismaUserRepository,
		);
	}
}
