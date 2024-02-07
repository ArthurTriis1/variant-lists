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

	async findBySlug(slug: string): Promise<List | null> {
		return this.lists.find((list) => list.slug.value === slug) ?? null;
	}

	async save(list: List) {
		const itemIndex = this.lists.findIndex((item) => item.id === list.id);

		this.lists[itemIndex] = list;
	}

	async findManyByCreatorId(creatorId: string): Promise<List[]> {
		return this.lists.filter(
			(list) => list.creatorId.toString() === creatorId,
		);
	}
}
