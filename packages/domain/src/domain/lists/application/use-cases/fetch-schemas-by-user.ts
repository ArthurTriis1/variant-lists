import { Schema } from "@src/domain/lists/enterprise/entities/schema";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";

interface FetchSchemasByUserRequest {
	creatorUsername: string;
}

interface FetchSchemasByUserResponse {
	schemas: Schema[];
}

export class FetchSchemasByUser {
	constructor(private schemaRepository: SchemaRepository) {}

	async execute({
		creatorUsername,
	}: FetchSchemasByUserRequest): Promise<FetchSchemasByUserResponse> {
		const schemas =
			await this.schemaRepository.findManyByCreatorUsername(
				creatorUsername,
			);

		return {
			schemas,
		};
	}
}
