import { UseCaseError } from "@src/core/errors/use-case-error";

export class ResourceNotFoundError extends UseCaseError {
	constructor(resource: string = "Resource") {
		super(`${resource} not found`);
	}
}
