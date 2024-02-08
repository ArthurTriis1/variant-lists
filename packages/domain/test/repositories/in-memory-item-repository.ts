import { PaginationParams } from "@src/core/types/PaginationParams";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { Item } from "@src/domain/lists/enterprise/entities/item";

export class InMemoryItemRepository implements ItemRepository {
	public items: Item[] = [];

	async create(item: Item) {
		this.items.push(item);
	}

	async findBySlug(slug: string): Promise<Item | null> {
		return this.items.find((item) => item.slug.value === slug) ?? null;
	}

	async findManyByListId(
		listId: string,
		{ page }: PaginationParams,
	): Promise<Item[]> {
		return this.items
			.filter((list) => list.listId.toValue() === listId)
			.slice((page - 1) * 20, page * 20);
	}

	async findAllByListId(listId: string): Promise<Item[]> {
		return this.items.filter((list) => list.listId.toValue() === listId);
	}

	async save(item: Item): Promise<void> {
		const itemIndex = this.items.findIndex(
			(foundItem) => foundItem.id === item.id,
		);

		this.items[itemIndex] = item;
	}
}
