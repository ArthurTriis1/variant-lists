import { ResourceNotFoundError } from "@src/core/errors/resource-not-found-error";

export class ItemNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("Item");
	}
}
