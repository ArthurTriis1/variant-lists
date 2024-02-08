import { UseCaseError } from "@src/core/errors/use-case-error";

export class NotValidSchemaError extends Error implements UseCaseError {
	constructor() {
		super("Not valid schema");
	}
}
