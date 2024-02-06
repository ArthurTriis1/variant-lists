import { Item } from "../../enterprise/entitites/item";

export interface ItemRepository {
	create(item: Item): Promise<void>;
	findBySlug(slug: string): Promise<Item | null>;
}
