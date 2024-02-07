import { ItemRepository } from "../repositories/item-repository";
import { SchemaRepository } from "../repositories/schema-repository";
import { ListRepository } from "../repositories/list-repository";
import { Validator } from "../services/validator";
import { ListNotFoundError } from "@src/core/errors/errors/list-not-found-error";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";
import { SchemaNotFoundError } from "@src/core/errors/errors/schema-not-found-error";

interface ValidateAllItemsFromListRequest {
	creatorId: string;
	listId: string;
}

interface ValidateAllItemsFromListResponse {}

export class ValidateAllItemsFromListUseCase {
	constructor(
		private itemRepository: ItemRepository,
		private schemaRepository: SchemaRepository,
		private listRepository: ListRepository,
		private validator: Validator,
	) {}

	async execute({
		creatorId,
		listId,
	}: ValidateAllItemsFromListRequest): Promise<ValidateAllItemsFromListResponse | null> {
		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		if (list.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
		}

		const schema = await this.schemaRepository.findById(
			list.schemaId.toValue(),
		);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		const items = await this.itemRepository.findAllByListId(listId);

		items.forEach(async (item) => {
			const isUpToDate =
				item.lastValidationDate.getTime() >=
				schema.lastUpdateSchemaDate.getTime();

			if (isUpToDate) return;

			const isValid = await this.validator.validateByJsonSchema(
				schema.data,
				item.data,
			);

			item.isValid = isValid;
			item.lastValidationDate = new Date();

			this.itemRepository.save(item);
		});

		return {};
	}
}
