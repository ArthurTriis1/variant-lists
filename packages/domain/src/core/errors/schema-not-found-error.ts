import { ResourceNotFoundError } from "@src/core/errors/resource-not-found-error";

export class SchemaNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("Schema");
	}
}
