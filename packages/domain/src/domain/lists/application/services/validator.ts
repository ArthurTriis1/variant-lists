export interface Validator {
	validateJsonSchema(schema: Record<string, unknown>): Promise<boolean>;
	validateByJsonSchema(
		schema: Record<string, unknown>,
		value: Record<string, unknown>,
	): Promise<boolean>;
}
