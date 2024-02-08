import { List } from "@src/domain/lists/enterprise/entities/list";

export interface ListRepository {
	create(list: List): Promise<void>;
	findById(id: string): Promise<List | null>;
	findBySlug(slug: string): Promise<List | null>;
	save(list: List): Promise<void>;
	findManyByCreatorId(creatorId: string): Promise<List[]>;
}
