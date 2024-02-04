import Ajv, { ValidateFunction } from "ajv";
import { Validator } from "./validator";

export class JsonSchemaValidator implements Validator {
	async validateJsonSchema(value: Record<string, unknown>): Promise<boolean> {
		const ajv = new Ajv();

		let isValidSchema: ValidateFunction;

		try {
			isValidSchema = ajv.compile(value);
			return !!isValidSchema;
		} catch {
			return false;
		}
	}

	async validateByJsonSchema(
		schema: Record<string, unknown>,
		value: Record<string, unknown>,
	): Promise<boolean> {
		const ajv = new Ajv();

		const validate = ajv.compile(schema);
		return validate(value);
	}
}
