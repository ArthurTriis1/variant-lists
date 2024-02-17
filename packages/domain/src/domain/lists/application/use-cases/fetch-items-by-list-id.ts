import { Item } from "@src/domain/lists/enterprise/entities/item";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { ListRepository } from "../repositories";
import { NotAllowedError } from "@src/core/errors";
import { ListNotFoundError } from "dist";

interface FetchItemsByListIdRequest {
	creatorId: string;
	listId: string;
	page?: number;
}

interface FetchItemsByItemIdResponse {
	items: Item[];
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

		const items = await this.itemRepository.findManyByListId(listId, {
			page,
		});

		return {
			items,
		};
	}
}
