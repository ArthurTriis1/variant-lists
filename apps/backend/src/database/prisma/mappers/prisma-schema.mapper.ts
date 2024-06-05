import { Schema as PrismaSchema, Prisma } from "@prisma/client";
import { Schema, Slug, UniqueEntityID } from "@variant-lists/domain";

export class PrismaSchemaMapper {
	static toDomain(raw: PrismaSchema): Schema {
		return Schema.create(
			{
				title: raw.title,
				description: raw.description,
				creatorUsername: raw.creatorUsername,
				data: raw.data as Record<string, unknown>,
				lastUpdateSchemaDate: raw.lastUpdateSchemaDate,
				slug: Slug.create(raw.slug),
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPrisma(schema: Schema): Prisma.SchemaUncheckedCreateInput {
		return {
			id: schema.id.toString(),
			title: schema.title,
			description: schema.description,
			creatorUsername: schema.creatorUsername,
			lastUpdateSchemaDate: schema.lastUpdateSchemaDate,
			data: schema.data as Prisma.InputJsonValue,
			slug: schema.slug.value,
		};
	}
}
