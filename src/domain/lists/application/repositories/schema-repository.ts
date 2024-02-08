import { Schema } from "@src/domain/lists/enterprise/entitites/schema";

export interface SchemaRepository {
	create(schema: Schema): Promise<void>;
	save(answer: Schema): Promise<void>;
	findById(id: string): Promise<Schema | null>;
	findBySlug(slug: string): Promise<Schema | null>;
	findManyByCreatorId(creatorId: string): Promise<Schema[]>;
}
