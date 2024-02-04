import { ResourceNotFoundError } from "./resource-not-found-error";

export class ListNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("List");
	}
}
