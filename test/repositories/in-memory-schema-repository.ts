import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { Schema } from "@src/domain/lists/enterprise/entitites/schema";

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

	async save(schema: Schema) {
		const itemIndex = this.schemas.findIndex(
			(schema) => schema.id === schema.id,
		);

		this.schemas[itemIndex] = schema;
	}
}
