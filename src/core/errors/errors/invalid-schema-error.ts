import { UseCaseError } from "../use-case-error";

export class InvalidSchemaError extends Error implements UseCaseError {
	constructor() {
		super("Item does not match schema");
	}
}
