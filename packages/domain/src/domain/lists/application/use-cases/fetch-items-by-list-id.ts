import { Item } from "@src/domain/lists/enterprise/entities/item";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { ListRepository } from "../repositories";
import { NotAllowedError, ListNotFoundError } from "@src/core/errors";

interface FetchItemsByListIdRequest {
	creatorId: string;
	listId: string;
	page?: number;
}

interface FetchItemsByItemIdResponse {
	items: Item[];
	total: number;
}

export class FetchItemsByListId {
	constructor(
		private itemRepository: ItemRepository,
		private listRepository: ListRepository,
	) {}

	async execute({
		creatorId,
		listId,
		page = 1,
	}: FetchItemsByListIdRequest): Promise<FetchItemsByItemIdResponse> {
		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		if (list?.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
		}

		const total = await this.itemRepository.countByListId(listId);

		const items = await this.itemRepository.findManyByListId(listId, {
			page,
		});

		return {
			items,
			total,
		};
	}
}
