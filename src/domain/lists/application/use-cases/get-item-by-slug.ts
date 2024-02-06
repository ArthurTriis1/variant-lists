import { Item } from "../../enterprise/entitites/item";
import { ItemRepository } from "../repositories/item-repository";
import { ItemNotFoundError } from "@src/core/errors/errors/item-not-found-error";

interface GetItemBySlugRequest {
	slug: string;
}

interface GetItemBySlugResponse {
	item: Item;
}

export class GetItemBySlugUseCase {
	constructor(private itemRepository: ItemRepository) {}

	async execute({
		slug,
	}: GetItemBySlugRequest): Promise<GetItemBySlugResponse> {
		const item = await this.itemRepository.findBySlug(slug);

		if (!item) {
			throw new ItemNotFoundError();
		}

		return { item };
	}
}
