import { Schema as PrismaSchema, Prisma } from "@prisma/client";
import { Schema, Slug, UniqueEntityID } from "@variant-lists/domain";

export class PrismaSchemaMapper {
	static toDomain(raw: PrismaSchema): Schema {
		return Schema.create(
			{
				title: raw.title,
				description: raw.description,
				creatorId: new UniqueEntityID(raw.creatorId),
				data: JSON.parse(raw.data?.toString() ?? "{}"),
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
			creatorId: schema.creatorId.toString(),
			lastUpdateSchemaDate: schema.lastUpdateSchemaDate,
			data: schema.data as Prisma.InputJsonValue,
			slug: schema.slug.value,
		};
	}
}
