import { PaginationParams } from "@src/core/types/PaginationParams";
import { Item } from "@src/domain/lists/enterprise/entities/item";

export interface ItemRepository {
	create(item: Item): Promise<void>;
	save(item: Item): Promise<void>;
	findBySlug({
		slug,
		listSlug,
		creatorUsername,
	}: {
		slug: string;
		listSlug: string;
		creatorUsername: string;
	}): Promise<Item | null>;
	findManyByListSlug(
		listSlug: string,
		creatorUsername: string,
		paginationParams: PaginationParams,
	): Promise<Item[]>;
	countByListSlug(listSlug: string, creatorUsername: string): Promise<number>;
	findAllByListSlug(
		listSlug: string,
		creatorUsername: string,
	): Promise<Item[]>;
}
