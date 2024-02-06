import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error";
import { Schema } from "../../enterprise/entitites/schema";
import { SchemaRepository } from "../repositories/schema-repository";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";

interface GetSchemaBySlugRequest {
	slug: string;
	creatorId: string;
}

interface GetSchemaBySlugResponse {
	schema: Schema;
}

export class GetSchemaBySlugUseCase {
	constructor(private schemaRepository: SchemaRepository) {}

	async execute({
		slug,
		creatorId,
	}: GetSchemaBySlugRequest): Promise<GetSchemaBySlugResponse> {
		const schema = await this.schemaRepository.findBySlug(slug);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		if (schema.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
		}

		return { schema };
	}
}
