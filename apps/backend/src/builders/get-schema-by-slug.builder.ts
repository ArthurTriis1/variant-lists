import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import { GetSchemaBySlug } from "@variant-lists/domain";

export default class GetSchemaBySlugBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
	}

	build() {
		return new GetSchemaBySlug(this.prismaSchemaRepository);
	}
}
