export interface Validator {
	validate(value: Record<string, unknown>): Promise<boolean>;
}
