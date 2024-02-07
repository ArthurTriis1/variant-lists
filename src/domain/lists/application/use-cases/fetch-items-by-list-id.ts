import { Item } from "../../enterprise/entitites/item";
import { ItemRepository } from "../repositories/item-repository";

interface FetchItemsByListIdRequest {
	listId: string;
	page?: number;
}

interface FetchItemsByItemIdResponse {
	items: Item[];
}

export class FetchItemsByListIdUseCase {
	constructor(private itemRepository: ItemRepository) {}

	async execute({
		listId,
		page = 1,
	}: FetchItemsByListIdRequest): Promise<FetchItemsByItemIdResponse> {
		const items = await this.itemRepository.findManyByListId(listId, {
			page,
		});

		return {
			items,
		};
	}
}
