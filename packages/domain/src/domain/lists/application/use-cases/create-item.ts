import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Item } from "@src/domain/lists/enterprise/entities/item";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { Validator } from "@src/domain/lists/application/services/validator";
import { ListNotFoundError } from "@src/core/errors/list-not-found-error";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { ItemMismatchSchema } from "@src/core/errors/item-mismatch-schema-error";
import { NotAllowedError } from "@src/core/errors";
import { UserRepository } from "../repositories/user-repository";
import { CreatorNotFoundError } from "@src/core/errors/creator-not-found-error";

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

export class CreateItem {
	constructor(
		private itemRepository: ItemRepository,
		private schemaRepository: SchemaRepository,
		private listRepository: ListRepository,
		private userRepository: UserRepository,
		private validator: Validator,
	) {}

	async execute({
		title,
		description,
		creatorId,
		listId,
		imageUrl,
		data,
	}: CreateItemRequest): Promise<CreateItemResponse> {
		const user = await this.userRepository.findById(creatorId);

		if (!user) {
			throw new CreatorNotFoundError();
		}

		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		if (list.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
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
			throw new ItemMismatchSchema();
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
