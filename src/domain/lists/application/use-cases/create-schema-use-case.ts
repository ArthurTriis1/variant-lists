import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Schema } from "../../enterprise/entitites/schema";
import { SchemaRepository } from "../repositories/schema-repository";
import { Validator } from "../services/validator";
import { NotValidSchemaError } from "@src/core/errors/errors/not-valid-schema-error";

interface CreateSchemaRequest {
	title: string;
	creatorId: string;
	data: Record<string, unknown>;
}

interface CreateSchemaResponse {
	schema: Schema;
}

export class CreateSchemaUseCase {
	constructor(
		private schemaRepository: SchemaRepository,
		private validator: Validator,
	) {}

	async execute({
		title,
		creatorId,
		data,
	}: CreateSchemaRequest): Promise<CreateSchemaResponse | null> {
		const jsonSchemaIsValid = await this.validator.validateJsonSchema(data);

		if (!jsonSchemaIsValid) {
			throw new NotValidSchemaError();
		}

		const schema = Schema.create({
			title,
			creatorId: new UniqueEntityID(creatorId),
			data,
		});

		await this.schemaRepository.create(schema);

		return {
			schema,
		};
	}
}
