import { Schema } from "@src/domain/lists/enterprise/entities/schema";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";

interface FetchSchemasByUserRequest {
	creatorId: string;
}

interface FetchSchemasByUserResponse {
	schemas: Schema[];
}

export class FetchSchemasByUser {
	constructor(private schemaRepository: SchemaRepository) {}

	async execute({
		creatorId,
	}: FetchSchemasByUserRequest): Promise<FetchSchemasByUserResponse> {
		const schemas =
			await this.schemaRepository.findManyByCreatorId(creatorId);

		return {
			schemas,
		};
	}
}
