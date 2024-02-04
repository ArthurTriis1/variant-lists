import { ResourceNotFoundError } from "./resource-not-found-error";

export class SchemaNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("Schema");
	}
}
