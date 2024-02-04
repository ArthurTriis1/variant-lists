import { Item } from "../../enterprise/entitites/item";

export interface ItemRepository {
	create(item: Item): Promise<void>;
}
