import { UseCaseError } from "@src/core/errors/use-case-error";

export class NotAllowedError extends UseCaseError {
	constructor() {
		super("Not allowed");
	}
}
