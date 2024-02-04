import { List } from "../../enterprise/entitites/list";

export interface ListRepository {
	create(list: List): Promise<void>;
}
