import { JsonSchemaValidator } from "@src/domain/lists/application/services/json-schema-validator";

describe("Json Schema Validator", () => {
	it("Should return false to a invalid schema", async () => {
		const jsonSchemaValidator = new JsonSchemaValidator();
		const isSchemaValid = await jsonSchemaValidator.validateJsonSchema({});

		expect(isSchemaValid).toBeFalsy();
	});
});
