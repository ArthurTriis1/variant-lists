import { Item as PrismaItem, Prisma } from "@prisma/client";
import { Item, Slug, UniqueEntityID } from "@variant-lists/domain";

export class PrismaItemMapper {
	static toDomain(raw: PrismaItem): Item {
		return Item.create(
			{
				title: raw.title,
				slug: Slug.create(raw.slug),
				description: raw.slug,
				listId: new UniqueEntityID(raw.listId),
				creatorId: new UniqueEntityID(raw.creatorId),
				imageUrl: raw.imageUrl ?? undefined,
				lastValidationDate: raw.lastValidationDate ?? undefined,
				isValid: raw.isValid ?? undefined,
				data: raw.data as Record<string, unknown>,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPrisma(item: Item): Prisma.ItemUncheckedCreateInput {
		return {
			id: item.id.toString(),
			title: item.title,
			slug: item.slug.value,
			description: item.description,
			imageUrl: item.imageUrl,
			lastValidationDate: item.lastValidationDate,
			isValid: item.isValid,
			data: item.data as Prisma.InputJsonValue,
			creatorId: item.creatorId.toString(),
			listId: item.listId.toString(),
		};
	}
}
