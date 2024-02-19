import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";
import PrismaUserRepository from "@src/database/prisma/repositories/prisma-user.repository";
import { JsonSchemaValidator, CreateSchema } from "@variant-lists/domain";

export default class CreateSchemaBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	jsonSchemaValidator: JsonSchemaValidator;
	prismaUserRepository: PrismaUserRepository;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.prismaUserRepository = new PrismaUserRepository();
		this.jsonSchemaValidator = new JsonSchemaValidator();
	}

	build() {
		return new CreateSchema(
			this.prismaSchemaRepository,
			this.prismaUserRepository,
			this.jsonSchemaValidator,
		);
	}
}
