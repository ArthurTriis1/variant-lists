import { UseCaseError } from "@src/core/errors/use-case-error";

export class SlugAlreadyExistsError extends UseCaseError {
	constructor() {
		super("Slug already exists");
	}
}
