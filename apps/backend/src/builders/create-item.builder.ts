import PrismaItemRepository from "@src/database/prisma/repositories/prisma-item.repository";
import PrismaListRepository from "@src/database/prisma/repositories/prisma-list.repository";
import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { CreateItem, JsonSchemaValidator } from "@variant-lists/domain";

export default class CreateItemBuilder {
	prismaItemRepository: PrismaItemRepository;
	prismaSchemaRepository: PrismaSchemaRepository;
	prismaUserRepository: PrismaUserRepository;
	prismaListRepository: PrismaListRepository;
	jsonSchemaValidator: JsonSchemaValidator;
	constructor() {
		this.prismaItemRepository = new PrismaItemRepository();
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.prismaUserRepository = new PrismaUserRepository();
		this.prismaListRepository = new PrismaListRepository();
		this.jsonSchemaValidator = new JsonSchemaValidator();
	}

	build() {
		return new CreateItem(
			this.prismaItemRepository,
			this.prismaSchemaRepository,
			this.prismaListRepository,
			this.prismaUserRepository,
			this.jsonSchemaValidator,
		);
	}
}
