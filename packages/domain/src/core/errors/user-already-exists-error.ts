import { UseCaseError } from "@src/core/errors/use-case-error";

export class UserAlreadyExistsError extends UseCaseError {
	constructor() {
		super("User already exists");
	}
}
