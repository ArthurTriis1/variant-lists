import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { List } from "@src/domain/lists/enterprise/entitites/list";

export class InMemoryListRepository implements ListRepository {
	public lists: List[] = [];

	async create(list: List) {
		this.lists.push(list);
	}

	async findById(id: string): Promise<List | null> {
		return this.lists.find((list) => list.id.toString() === id) ?? null;
	}
}
