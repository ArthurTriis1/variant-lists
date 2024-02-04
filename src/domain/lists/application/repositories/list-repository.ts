import { List } from "../../enterprise/entitites/list";

export interface ListRepository {
	create(list: List): Promise<void>;
	findById(id: string): Promise<List | null>;
	save(list: List): Promise<void>;
}
