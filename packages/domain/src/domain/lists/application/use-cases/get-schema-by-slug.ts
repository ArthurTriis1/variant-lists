import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { Schema } from "@src/domain/lists/enterprise/entities/schema";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";
import { UserRepository } from "../repositories";

interface GetSchemaBySlugRequest {
	slug: string;
	creatorUsername: string;
	userId: string;
}

interface GetSchemaBySlugResponse {
	schema: Schema;
}

export class GetSchemaBySlug {
	constructor(
		private schemaRepository: SchemaRepository,
		private userRepository: UserRepository,
	) {}

	async execute({
		slug,
		creatorUsername,
		userId,
	}: GetSchemaBySlugRequest): Promise<GetSchemaBySlugResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user || creatorUsername !== user?.username) {
			throw new NotAllowedError();
		}

		const schema = await this.schemaRepository.findBySlug({
			slug,
			creatorUsername,
		});

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		return { schema };
	}
}
