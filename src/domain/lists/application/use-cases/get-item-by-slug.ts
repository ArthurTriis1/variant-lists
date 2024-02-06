import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";
import { Item } from "../../enterprise/entitites/item";
import { ItemRepository } from "../repositories/item-repository";
import { ItemNotFoundError } from "@src/core/errors/errors/item-not-found-error";

interface GetItemBySlugRequest {
	slug: string;
	creatorId: string;
}

interface GetItemBySlugResponse {
	item: Item;
}

export class GetItemBySlugUseCase {
	constructor(private itemRepository: ItemRepository) {}

	async execute({
		slug,
		creatorId,
	}: GetItemBySlugRequest): Promise<GetItemBySlugResponse> {
		const item = await this.itemRepository.findBySlug(slug);

		if (!item) {
			throw new ItemNotFoundError();
		}

		if (item.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
		}

		return { item };
	}
}
