import { ResourceNotFoundError } from "./resource-not-found-error";

export class ItemNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("Item");
	}
}
