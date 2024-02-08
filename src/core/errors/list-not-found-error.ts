import { ResourceNotFoundError } from "@src/core/errors/resource-not-found-error";

export class ListNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("List");
	}
}
