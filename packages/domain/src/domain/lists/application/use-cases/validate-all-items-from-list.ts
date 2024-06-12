import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { Validator } from "@src/domain/lists/application/services/validator";
import { ListNotFoundError } from "@src/core/errors/list-not-found-error";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";
import { SchemaNotFoundError } from "@src/core/errors/schema-not-found-error";
import { UserRepository } from "../repositories";

interface ValidateAllItemsFromListRequest {
	creatorId: string;
	listId: string;
}

interface ValidateAllItemsFromListResponse {}

export class ValidateAllItemsFromList {
	constructor(
		private itemRepository: ItemRepository,
		private schemaRepository: SchemaRepository,
		private listRepository: ListRepository,
		private userRepository: UserRepository,
		private validator: Validator,
	) {}

	async execute({
		creatorId,
		listId,
	}: ValidateAllItemsFromListRequest): Promise<ValidateAllItemsFromListResponse | null> {
		const user = await this.userRepository.findById(creatorId);

		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		if (list.creatorUsername !== user?.username) {
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
