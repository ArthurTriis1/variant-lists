import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { List } from "@src/domain/lists/enterprise/entitites/list";

export class InMemoryListRepository implements ListRepository {
	public items: List[] = [];

	async create(list: List) {
		this.items.push(list);
	}
}
