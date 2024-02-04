import { Schema } from "../../enterprise/entitites/schema";

export interface SchemaRepository {
	create(schema: Schema): Promise<void>;
	findById(id: string): Promise<Schema | null>;
}
