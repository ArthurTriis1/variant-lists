import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema-repository";
import { JsonSchemaValidator, CreateSchema } from "@variant-lists/domain";

export default class CreateSchemaBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	jsonSchemaValidator: JsonSchemaValidator;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.jsonSchemaValidator = new JsonSchemaValidator();
	}

	build() {
		return new CreateSchema(
			this.prismaSchemaRepository,
			this.jsonSchemaValidator,
		);
	}
}
