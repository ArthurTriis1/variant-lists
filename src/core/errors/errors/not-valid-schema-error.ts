import { UseCaseError } from "../use-case-error";

export class NotValidSchemaError extends Error implements UseCaseError {
	constructor() {
		super("Not valid schema");
	}
}
