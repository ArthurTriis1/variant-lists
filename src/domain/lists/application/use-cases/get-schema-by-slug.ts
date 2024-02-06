import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error";
import { Schema } from "../../enterprise/entitites/schema";
import { SchemaRepository } from "../repositories/schema-repository";

interface GetSchemaBySlugRequest {
	slug: string;
}

interface GetSchemaBySlugResponse {
	schema: Schema;
}

export class GetSchemaBySlugUseCase {
	constructor(private schemaRepository: SchemaRepository) {}

	async execute({
		slug,
	}: GetSchemaBySlugRequest): Promise<GetSchemaBySlugResponse> {
		const schema = await this.schemaRepository.findBySlug(slug);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		return { schema };
	}
}
