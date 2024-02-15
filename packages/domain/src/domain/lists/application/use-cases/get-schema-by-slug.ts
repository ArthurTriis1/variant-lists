import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { Schema } from "@src/domain/lists/enterprise/entities/schema";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";

interface GetSchemaBySlugRequest {
	slug: string;
	creatorId: string;
}

interface GetSchemaBySlugResponse {
	schema: Schema;
}

export class GetSchemaBySlug {
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
