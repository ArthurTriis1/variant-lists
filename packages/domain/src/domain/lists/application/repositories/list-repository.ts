import { List } from "@src/domain/lists/enterprise/entities/list";

export interface ListRepository {
	create(list: List): Promise<void>;
	findById(id: string): Promise<List | null>;
	findBySlug({
		slug,
		creatorUsername,
	}: {
		slug: string;
		creatorUsername: string;
	}): Promise<List | null>;
	save(list: List): Promise<void>;
	findManyByCreatorUsername(creatorUsername: string): Promise<List[]>;
}
