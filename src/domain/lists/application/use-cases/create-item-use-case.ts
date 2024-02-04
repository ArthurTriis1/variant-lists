import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Item } from "../../enterprise/entitites/item";
import { ItemRepository } from "../repositories/item-repository";
import { SchemaRepository } from "../repositories/schema-repository";
import { ListRepository } from "../repositories/list-repository";
import { Validator } from "../services/validator";
import { ListNotFoundError } from "@src/core/errors/errors/list-not-found-error";
import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error copy";
import { InvalidSchemaError } from "@src/core/errors/errors/invalid-schema-error";

interface CreateItemRequest {
	title: string;
	description: string;
	creatorId: string;
	listId: string;
	imageUrl?: string;
	data: Record<string, unknown>;
}

interface CreateItemResponse {
	item: Item;
}

export class CreateItemUseCase {
	constructor(
		private itemRepository: ItemRepository,
		private schemaRepository: SchemaRepository,
		private listRepository: ListRepository,
		private validator: Validator,
	) {}

	async execute({
		title,
		description,
		creatorId,
		listId,
		imageUrl,
		data,
	}: CreateItemRequest): Promise<CreateItemResponse | null> {
		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		const schema = await this.schemaRepository.findById(
			list.schemaId.toString(),
		);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		const isValid = await this.validator.validateByJsonSchema(
			schema.data,
			data,
		);

		if (!isValid) {
			throw new InvalidSchemaError();
		}

		const item = Item.create({
			title,
			description,
			creatorId: new UniqueEntityID(creatorId),
			listId: new UniqueEntityID(listId),
			data,
			lastValidationDate: new Date(),
			isValid: true,
			imageUrl,
		});

		await this.itemRepository.create(item);

		return {
			item,
		};
	}
}
