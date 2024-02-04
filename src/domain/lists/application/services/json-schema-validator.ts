import Ajv from "ajv";
import { Validator } from "./validator";

export class JsonSchemaValidator implements Validator {
	async validateJsonSchema(value: Record<string, unknown>): Promise<boolean> {
		const ajv = new Ajv();

		const isValidSchema = ajv.compile(value);

		return !!isValidSchema;
	}

	async validateByJsonSchema(
		schema: Record<string, unknown>,
		value: Record<string, unknown>,
	): Promise<boolean> {
		const ajv = new Ajv();

		const validate = ajv.compile(schema);
		const valid = validate(value);

		console.log("VALid", valid);

		return valid;
	}
}
