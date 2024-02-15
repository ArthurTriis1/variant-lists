import {
	JsonSchemaValidator,
	InMemorySchemaRepository,
	CreateSchema,
} from "@variant-lists/domain";

export const createSchemaUseCaseFactory = () => {
	const inMemorySchemaRepository = new InMemorySchemaRepository();
	const jsonSchemaValidator = new JsonSchemaValidator();

	return new CreateSchema(inMemorySchemaRepository, jsonSchemaValidator);
};
