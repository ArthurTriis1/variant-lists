import { UseCaseError } from "../use-case-error";

export class ItemMismatchSchema extends Error implements UseCaseError {
	constructor() {
		super("Item mismatch schema");
	}
}
