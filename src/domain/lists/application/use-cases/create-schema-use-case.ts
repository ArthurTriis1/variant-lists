import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Schema } from "../../enterprise/entitites/schema";
import { SchemaRepository } from "../repositories/schema-repository";
import { Validator } from "../services/validator";

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
		const jsonSchemaIsValid = await this.validator.validate(data);

		if (!jsonSchemaIsValid) {
			return null;
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
