import { Item } from "@src/domain/lists/enterprise/entities/item";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { ListRepository, UserRepository } from "../repositories";
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
		private userRepository: UserRepository,
	) {}

	async execute({
		creatorId,
		listId,
		page = 1,
	}: FetchItemsByListIdRequest): Promise<FetchItemsByItemIdResponse> {
		const user = await this.userRepository.findById(creatorId);

		const list = await this.listRepository.findById(listId);

		if (!list) {
			throw new ListNotFoundError();
		}

		if (list?.creatorUsername !== user?.username) {
			throw new NotAllowedError();
		}

		const total = await this.itemRepository.countByListSlug(
			list.slug.value,
			user.username,
		);

		const items = await this.itemRepository.findManyByListSlug(
			list.slug.value,
			user.username,
			{
				page,
			},
		);

		return {
			items,
			total,
		};
	}
}
