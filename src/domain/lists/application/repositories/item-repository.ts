import { PaginationParams } from "@src/core/types/PaginationParams";
import { Item } from "@src/domain/lists/enterprise/entitites/item";

export interface ItemRepository {
	create(item: Item): Promise<void>;
	save(item: Item): Promise<void>;
	findBySlug(slug: string): Promise<Item | null>;
	findManyByListId(
		listId: string,
		paginationParams: PaginationParams,
	): Promise<Item[]>;
	findAllByListId(listId: string): Promise<Item[]>;
}
