import { NotValidSchemaError } from "@src/core/errors/errors/not-valid-schema-error";
import { SchemaRepository } from "../repositories/schema-repository";
import { Validator } from "../services/validator";
import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";

interface UpdateSchemaRequest {
	title?: string;
	description?: string;
	creatorId: string;
	schemaId: string;
	data?: Record<string, unknown>;
}

interface UpdateSchemaResponse {}

export class UpdateSchemaUseCase {
	constructor(
		private schemaRepository: SchemaRepository,
		private validator: Validator,
	) {}

	async execute({
		title,
		schemaId,
		creatorId,
		description,
		data,
	}: UpdateSchemaRequest): Promise<UpdateSchemaResponse | null> {
		const schema = await this.schemaRepository.findById(schemaId);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		if (schema.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
		}

		if (data) {
			const jsonSchemaIsValid =
				await this.validator.validateJsonSchema(data);

			if (!jsonSchemaIsValid) {
				throw new NotValidSchemaError();
			}

			schema.data = data;
		}

		if (title) schema.title = title;
		if (description) schema.description = description;

		await this.schemaRepository.save(schema);

		return {
			schema,
		};
	}
}
