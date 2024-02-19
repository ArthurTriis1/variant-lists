import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import { ForkSchemaByList, JsonSchemaValidator } from "@variant-lists/domain";

export default class ForkSchemaByListBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	prismaListRepository: PrismaListRepository;
	jsonSchemaValidator: JsonSchemaValidator;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.prismaListRepository = new PrismaListRepository();
		this.jsonSchemaValidator = new JsonSchemaValidator();
	}

	build() {
		return new ForkSchemaByList(
			this.prismaSchemaRepository,
			this.prismaListRepository,
			this.jsonSchemaValidator,
		);
	}
}
