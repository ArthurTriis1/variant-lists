import { Schema } from "@variant-lists/domain";

export type SchemaPresented = {
	title: string;
	slug: string;
	description: string;
	creatorId: string;
	data: Record<string, unknown>;
	lastUpdateSchemaDate: string;
};

export class SchemaPresenter {
	static toHTTP(schema: Schema): SchemaPresented {
		return {
			title: schema.title,
			slug: schema.slug.value,
			description: schema.description,
			creatorId: schema.creatorId.toString(),
			data: schema.data,
			lastUpdateSchemaDate: schema.lastUpdateSchemaDate.toISOString(),
		};
	}
}
