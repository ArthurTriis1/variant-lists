import { SchemaRepository } from "@src/domain/lists/application/repositories/schema-repository";
import { Schema } from "@src/domain/lists/enterprise/entitites/schema";

export class InMemorySchemaRepository implements SchemaRepository {
	public items: Schema[] = [];

	async create(schema: Schema) {
		this.items.push(schema);
	}
}
