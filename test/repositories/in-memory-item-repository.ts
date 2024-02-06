import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { Item } from "@src/domain/lists/enterprise/entitites/item";

export class InMemoryItemRepository implements ItemRepository {
	public items: Item[] = [];

	async create(item: Item) {
		this.items.push(item);
	}

	async findBySlug(slug: string): Promise<Item | null> {
		return this.items.find((item) => item.slug.value === slug) ?? null;
	}
}