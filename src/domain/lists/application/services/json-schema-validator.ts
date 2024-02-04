import Ajv from "ajv";
import { Validator } from "./validator";

export class JsonSchemaValidator implements Validator {
	async validate(value: Record<string, unknown>): Promise<boolean> {
		const ajv = new Ajv();

		console.log(value);

		const isValidSchema = await ajv.compile(value);

		console.log(isValidSchema);

		return !!isValidSchema;
	}
}
