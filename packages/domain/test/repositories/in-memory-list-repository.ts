import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { List } from "@src/domain/lists/enterprise/entities/list";

export class InMemoryListRepository implements ListRepository {
	public lists: List[] = [];

	async create(list: List) {
		this.lists.push(list);
	}

	async findById(id: string): Promise<List | null> {
		return this.lists.find((list) => list.id.toString() === id) ?? null;
	}

	async findBySlug({
		slug,
		creatorUsername,
	}: {
		slug: string;
		creatorUsername: string;
	}): Promise<List | null> {
		return (
			this.lists.find(
				(list) =>
					list.slug.value === slug &&
					list.creatorUsername === creatorUsername,
			) ?? null
		);
	}

	async save(list: List) {
		const itemIndex = this.lists.findIndex((item) => item.id === list.id);

		this.lists[itemIndex] = list;
	}

	async findManyByCreatorUsername(creatorUsername: string): Promise<List[]> {
		return this.lists.filter(
			(list) => list.creatorUsername === creatorUsername,
		);
	}
}
