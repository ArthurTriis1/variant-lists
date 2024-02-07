import { Schema } from "../../enterprise/entitites/schema";
import { SchemaRepository } from "../repositories/schema-repository";

interface FetchSchemasByUserRequest {
	creatorId: string;
}

interface FetchSchemasByUserResponse {
	schemas: Schema[];
}

export class FetchSchemasByUserUseCase {
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
