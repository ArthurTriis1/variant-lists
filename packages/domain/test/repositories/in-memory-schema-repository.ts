import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { Schema } from "@src/domain/lists/enterprise/entities/schema";

export class InMemorySchemaRepository implements SchemaRepository {
	public schemas: Schema[] = [];

	async create(schema: Schema) {
		this.schemas.push(schema);
	}

	async findById(id: string): Promise<Schema | null> {
		return (
			this.schemas.find((schema) => schema.id.toString() === id) ?? null
		);
	}

	async findBySlug(slug: string): Promise<Schema | null> {
		return (
			this.schemas.find((schema) => schema.slug.value === slug) ?? null
		);
	}

	async save(schema: Schema) {
		const itemIndex = this.schemas.findIndex(
			(schema) => schema.id === schema.id,
		);

		this.schemas[itemIndex] = schema;
	}

	async findManyByCreatorId(creatorId: string): Promise<Schema[]> {
		return this.schemas.filter(
			(schema) => schema.creatorId.toString() === creatorId,
		);
	}
}
