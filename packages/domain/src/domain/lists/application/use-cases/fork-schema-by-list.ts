import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { Validator } from "@src/domain/lists/application/services/validator";
import { Schema } from "@src/domain/lists/enterprise/entities/schema";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { NotValidSchemaError } from "@src/core/errors/not-valid-schema-error";
import { ListNotFoundError } from "@src/core/errors/list-not-found-error";

interface ForkSchemaByListRequest {
	listId: string;
	schemaId: string;
	creatorId: string;
	data: Record<string, unknown>;
}

interface ForkSchemaByListResponse {}

export class ForkSchemaByList {
	constructor(
		private schemaRepository: SchemaRepository,
		private listRepository: ListRepository,
		private validator: Validator,
	) {}

	async execute({
		listId,
		schemaId,
		creatorId,
		data,
	}: ForkSchemaByListRequest): Promise<ForkSchemaByListResponse> {
		const baseSchema = await this.schemaRepository.findById(schemaId);

		if (!baseSchema) {
			throw new SchemaNotFoundError();
		}

		const isSchemaValid = await this.validator.validateJsonSchema(data);

		if (!isSchemaValid) {
			throw new NotValidSchemaError();
		}

		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		const { title, description } = baseSchema;

		const schema = Schema.create({
			creatorId: new UniqueEntityID(creatorId),
			data: data,
			title,
			description,
		});

		await this.schemaRepository.create(schema);

		list.schemaId = schema.id;

		await this.listRepository.save(list);

		return {};
	}
}
