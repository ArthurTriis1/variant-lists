import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Schema } from "@src/domain/lists/enterprise/entities/schema";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { Validator } from "@src/domain/lists/application/services/validator";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";
import { UserRepository } from "../repositories/user-repository";
import { CreatorNotFoundError } from "@src/core/errors/creator-not-found-error";

interface CreateSchemaRequest {
	title: string;
	description: string;
	creatorId: string;
	data: Record<string, unknown>;
}

interface CreateSchemaResponse {
	schema: Schema;
}

export class CreateSchema {
	constructor(
		private schemaRepository: SchemaRepository,
		private userRepository: UserRepository,
		private validator: Validator,
	) {}

	async execute({
		creatorId,
		data,
		...props
	}: CreateSchemaRequest): Promise<CreateSchemaResponse | null> {
		const user = await this.userRepository.findById(creatorId);

		if (!user) {
			throw new CreatorNotFoundError();
		}

		const jsonSchemaIsValid = await this.validator.validateJsonSchema(data);

		if (!jsonSchemaIsValid) {
			throw new NotValidSchemaError();
		}

		const schema = Schema.create({
			...props,
			creatorId: new UniqueEntityID(creatorId),
			data,
		});

		await this.schemaRepository.create(schema);

		return {
			schema,
		};
	}
}
