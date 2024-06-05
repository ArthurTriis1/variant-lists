import { Schema } from "@variant-lists/domain";

export type SchemaPresented = {
	title: string;
	slug: string;
	description: string;
	creatorUsername: string;
	data: Record<string, unknown>;
	lastUpdateSchemaDate: string;
};

export class SchemaPresenter {
	static toHTTP(schema: Schema): SchemaPresented {
		return {
			title: schema.title,
			slug: schema.slug.value,
			description: schema.description,
			creatorUsername: schema.creatorUsername,
			data: schema.data,
			lastUpdateSchemaDate: schema.lastUpdateSchemaDate.toISOString(),
		};
	}
}
