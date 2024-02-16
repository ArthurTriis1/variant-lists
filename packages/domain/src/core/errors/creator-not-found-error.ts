import { ResourceNotFoundError } from "@src/core/errors/resource-not-found-error";

export class CreatorNotFoundError extends ResourceNotFoundError {
	constructor() {
		super("Creator");
	}
}
