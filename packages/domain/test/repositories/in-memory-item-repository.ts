import { PaginationParams } from "@src/core/types/PaginationParams";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { Item } from "@src/domain/lists/enterprise/entities/item";

export class InMemoryItemRepository implements ItemRepository {
	public items: Item[] = [];

	async create(item: Item) {
		this.items.push(item);
	}

	async findBySlug({
		slug,
		listSlug,
		creatorUsername,
	}: {
		slug: string;
		listSlug: string;
		creatorUsername: string;
	}): Promise<Item | null> {
		return (
			this.items.find(
				(item) =>
					item.slug.value === slug &&
					item.listSlug === listSlug &&
					item.creatorUsername === creatorUsername,
			) ?? null
		);
	}

	async findManyByListSlug(
		listSlug: string,
		creatorUsername: string,
		{ page }: PaginationParams,
	): Promise<Item[]> {
		return this.items
			.filter(
				(list) =>
					list.listSlug === listSlug &&
					list.creatorUsername === creatorUsername,
			)
			.slice((page - 1) * 20, page * 20);
	}

	async findAllByListSlug(
		listSlug: string,
		creatorUsername: string,
	): Promise<Item[]> {
		return this.items.filter(
			(list) =>
				list.listSlug === listSlug &&
				list.creatorUsername === creatorUsername,
		);
	}

	async countByListSlug(
		listSlug: string,
		creatorUsername: string,
	): Promise<number> {
		return this.items.filter(
			(list) =>
				list.listSlug === listSlug &&
				list.creatorUsername === creatorUsername,
		).length;
	}

	async save(item: Item): Promise<void> {
		const itemIndex = this.items.findIndex(
			(foundItem) => foundItem.id === item.id,
		);

		this.items[itemIndex] = item;
	}
}
