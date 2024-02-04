import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Schema } from "../../enterprise/entitites/schema";
import { SchemaRepository } from "../repositories/schema-repository";

interface CreateSchemaRequest {
	title: string;
	creatorId: string;
	data: Record<string, unknown>;
}

interface CreateSchemaResponse {
	schema: Schema;
}

export class CreateSchemaUseCase {
	constructor(private schemaRepository: SchemaRepository) {}

	async execute({
		title,
		creatorId,
		data,
	}: CreateSchemaRequest): Promise<CreateSchemaResponse> {
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
