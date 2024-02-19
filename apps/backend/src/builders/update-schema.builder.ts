import { UpdateSchema, JsonSchemaValidator } from "@variant-lists/domain";
import PrismaSchemaRepository from "@src/database/prisma/repositories/prisma-schema.repository";

export default class UpdateSchemaBuilder {
	prismaSchemaRepository: PrismaSchemaRepository;
	jsonSchemaValidator: JsonSchemaValidator;
	constructor() {
		this.prismaSchemaRepository = new PrismaSchemaRepository();
		this.jsonSchemaValidator = new JsonSchemaValidator();
	}

	build() {
		return new UpdateSchema(
			this.prismaSchemaRepository,
			this.jsonSchemaValidator,
		);
	}
}
